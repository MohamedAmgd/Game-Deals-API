import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'User-Agent': 'Chrome/95.0.4638.54'
      },
      withCredentials: true
    }),
    CacheModule.register({ ttl: 30 * 1000 })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
