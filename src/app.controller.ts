import { CacheInterceptor, Controller, Get, Optional, ParseBoolPipe, Query, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @UseInterceptors(CacheInterceptor)
  getDeals(@Query("free") free?: Boolean) {
    return this.appService.getDeals(free?.valueOf());
  }
}
