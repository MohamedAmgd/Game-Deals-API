import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @UseInterceptors(CacheInterceptor)
  getDeals(
    @Query("free") free?: boolean,
    @Query("page") page?: number,
    @Query("title") title?: string
  ) {
    return this.appService.getDeals(free, page, title);
  }
}
