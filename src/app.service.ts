import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) { }

  async getDeals(free?: boolean, page?: number, title?: string) {
    let deals_url = this.getDealsUrl(free, page, title)


    const result = await firstValueFrom(this.httpService.get(deals_url)).catch(() => { throw new NotFoundException() })
    const $ = cheerio.load(result.data)
    const deals_list_container = $('div[id="deals-list"]')
    const deals_list = $('.list-items', deals_list_container).children()
    const deals = []
    const no_results = deals_list_container
      .find('div[class="d-flex flex-column wrap_items list emptyProvider"]').text() != ""
    if (no_results) {
      return deals;
    }
    deals_list.each((_index, element) => {

      const name = $('div[class="game-info-title-wrapper"]', element).text()
      const old_price = $('span[class="price-label price-old"]', element).text()
      const new_price = $('span[class="price-inner game-price-new"]', element).text()
      const discount_percentage = $('span[class="discount label"]', element).text()
      const expiry_date = $('span[class="expiry label"]', element).find("time").text()

      let image_url = $('a[class="main-image"]', element).find('img').attr("src")
      if (image_url?.includes("data:")) {
        image_url = $('a[class="main-image"]', element).find('img').attr("data-src")
      }

      const discount_url = $('a[class="d-flex flex-align-center flex-justify-center label-with-arrows action-btn-full-box action-btn cta-label-desktop with-arrows action-ext"]', element)
        .attr('href')

      const is_historical_low: boolean = $('span[class="historical label"]', element).text() == "Historical low"
      deals.push({
        name: name,
        old_price: old_price,
        new_price: new_price,
        discount_percentage: discount_percentage,
        expiry_date: expiry_date,
        image_url: image_url?.replace("154x72", "308x144"),
        discount_url: "https://gg.deals".concat(discount_url),
        is_historical_low: is_historical_low
      })
    })
    return deals
  }
  getDealsUrl(free?: boolean, page?: number, title?: string): string {
    let deals_url = "https://gg.deals/deals/?minRating=1"
    if (free) {
      deals_url = deals_url.concat("&maxPrice=0")
    }
    if (page) {
      deals_url = deals_url.concat(`&page=${page}`)
    }
    if (title) {
      deals_url = deals_url.concat(`&title=${title}`)
    }
    return deals_url
  }
}
