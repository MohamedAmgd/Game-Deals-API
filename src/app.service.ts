import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) { }

  async getDeals() {
    const deals_url = "https://gg.deals/deals/?minRating=1"
    const result = await firstValueFrom(this.httpService.get(deals_url))
    const $ = cheerio.load(result.data)
    const deals_container = $('div[id="deals-container"]')[0]
    const deals_list_container = $('div[class="list-items shadow-box-small-lighter"]', deals_container).children()
    const deals = []
    deals_list_container.each((index, element) => {

      const name = $('div[class="game-info-title-wrapper"]', element).text()
      const old_price = $('span[class="price-label price-old"]', element).text()
      const new_price = $('span[class="price-inner game-price-new"]', element).text()
      const discount_percentage = $('span[class="discount label"]', element).text()

      let image_url = $('a[class="main-image"]', element).find('img').attr("src")
      if (image_url.includes("data:")) {
        image_url = $('a[class="main-image"]', element).find('img').attr("data-src")
      }

      const discount_url = $('a[class="d-flex flex-align-center flex-justify-center label-with-arrows action-btn-full-box action-btn cta-label-desktop with-arrows action-ext"]', element)
        .attr('href')
      deals.push({
        name: name,
        old_price: old_price,
        new_price: new_price,
        discount_percentage: discount_percentage,
        image_url: image_url.replace("154x72", "308x144"),
        discount_url: "https://gg.deals".concat(discount_url)
      })
    })
    return deals
  }
}
