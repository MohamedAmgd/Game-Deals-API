import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Query, Res, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  getDeals(
    @Query('free') free?: boolean,
    @Query('page') page?: number,
    @Query('title') title?: string,
  ) {
    return this.appService.getDeals(free, page, title);
  }

  // Endpoint to proxy deals' images
  @Get('image')
  async getImage(@Query('url') url: string, @Res() res: Response) {
    const image = await this.appService.getImage(url);
    res.setHeader('Content-Type', image.contentType); // or the appropriate image content type
    res.send(image.buffer);
  }
}
