import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as cheerio from 'cheerio';
import { firstValueFrom } from 'rxjs';
import * as https from 'https';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getDeals(free?: boolean, page?: number, title?: string) {
    const deals_url = this.getDealsUrl(free, page, title);

    const result = await firstValueFrom(this.httpService.get(deals_url)).catch(
      (err) => {
        console.log(`Error fetching deals from ${deals_url} reason: ${err}`);
        throw new NotFoundException();
      },
    );
    const $ = cheerio.load(result.data);
    const deals_list_container = $('div[id="deals-list"]');
    const deals_list = $('.list-items', deals_list_container).children();
    const deals = [];
    const no_results =
      deals_list_container
        .find('div[class="d-flex flex-column wrap_items list emptyProvider"]')
        .text() != '';
    if (no_results) {
      return deals;
    }
    const cleanText = (text?: string) =>
      (text || '').replace(/\s+/g, ' ').trim();
    deals_list.each((_index, element) => {
      const dealPriceWrapper = $('.deal-price-wrapper', element).first();
      const priceText = (selector: string) => {
        const selected = dealPriceWrapper.find(selector).first().clone();
        selected.find('.sr-only').remove();
        return cleanText(selected.text());
      };

      const name =
        cleanText($('.game-info-title.title', element).first().text()) ||
        cleanText($('.game-info-title-wrapper', element).text());
      const old_price = priceText('.base-price');
      const new_price = priceText('.price');
      const discount_percentage = priceText('.discount');
      const expiry_date = $('span[class="expiry label"]', element)
        .find('time')
        .text();

      let image_url = $('a[class="main-image"]', element)
        .find('img')
        .attr('src');
      if (image_url?.includes('data:')) {
        image_url = $('a[class="main-image"]', element)
          .find('img')
          .attr('data-src');
      }
      const original_image_url = image_url?.replace('154x72', '308x144');
      const vercelHost =
        process.env.VERCEL_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;
      const vercelUrl = vercelHost ? `https://${vercelHost}` : undefined;
      const new_image_url = new URL(
        process.env.APP_URL || vercelUrl || 'http://localhost:3000',
      );
      new_image_url.pathname = '/image';
      new_image_url.searchParams.set('url', original_image_url || '');
      image_url = new_image_url.toString();

      const discount_url = $(
        'a[class="d-flex flex-align-center flex-justify-center label-with-arrows action-btn-full-box action-btn cta-label-desktop with-arrows action-ext"]',
        element,
      ).attr('href');

      const is_historical_low: boolean =
        cleanText($('span[class="historical label"]', element).text()) ==
        'Historical low';
      deals.push({
        name: name,
        old_price: old_price,
        new_price: new_price,
        discount_percentage: discount_percentage,
        expiry_date: cleanText(expiry_date),
        image_url: image_url,
        original_image_url: original_image_url,
        discount_url: 'https://gg.deals'.concat(discount_url),
        is_historical_low: is_historical_low,
      });
    });
    return deals;
  }
  getDealsUrl(free?: boolean, page?: number, title?: string): string {
    let deals_url = 'https://gg.deals/deals/?minRating=1';
    if (free) {
      deals_url = deals_url.concat('&maxPrice=0');
    }
    if (page) {
      deals_url = deals_url.concat(`&page=${page}`);
    }
    if (title) {
      deals_url = deals_url.concat(`&title=${title}`);
    }
    return deals_url;
  }

  async getImage(url: string) {
    let imageUrl: URL;
    try {
      imageUrl = new URL(url);
    } catch {
      throw new BadRequestException('Invalid image URL');
    }

    if (
      imageUrl.protocol !== 'https:' ||
      imageUrl.hostname !== 'img.gg.deals'
    ) {
      throw new BadRequestException('Only img.gg.deals images are allowed');
    }

    const imageRequestAgent = new https.Agent({
      host: '167.99.223.123',
      port: 443,
      servername: 'img.gg.deals',
    });
    const result = await firstValueFrom(
      this.httpService.get(imageUrl.toString(), {
        responseType: 'arraybuffer',
        httpsAgent: imageRequestAgent,
        maxContentLength: 10 * 1024 * 1024,
      }),
    ).catch((err) => {
      console.log(`Error fetching image from ${url} reason: ${err}`);
      throw new NotFoundException();
    });
    const contentType = result.headers['content-type'];
    return {
      buffer: result.data,
      contentType:
        typeof contentType === 'string'
          ? contentType
          : 'application/octet-stream',
    };
  }
}
