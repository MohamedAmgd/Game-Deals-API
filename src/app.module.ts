import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as https from 'https';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    HttpModule.registerAsync({

      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        httpsAgent: new https.Agent({
          host: '188.166.99.46',
          port: 443,
          servername: "gg.deals",
        }),
        headers: {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9,ar;q=0.8",
          "cache-control": "no-cache",
          // "Cookie": process.env.GG_DEALS_COOKIE || config.get<string>('GG_DEALS_COOKIE') || "",
          "pragma": "no-cache",
          "priority": "u=0, i",
          "referer": "https://gg.deals/deals/?minRating=1&maxPrice=0&__cf_chl_tk=LyePR8RkyCSSP.g_fq5nOH9WG8SJaAFDbTzg1B53c28-1748538712-1.0.1.1-Eublvuid94VTISPdXxe4QIjVa8ONs4KkHgq9wWbXyvc",
          "sec-ch-ua": '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
          "sec-ch-ua-arch": "",
          "sec-ch-ua-bitness": "64",
          "sec-ch-ua-full-version": "136.0.7103.114",
          "sec-ch-ua-full-version-list": '"Chromium";v="136.0.7103.114", "Google Chrome";v="136.0.7103.114", "Not.A/Brand";v="99.0.0.0"',
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-model": "Nexus 5",
          "sec-ch-ua-platform": "Android",
          "sec-ch-ua-platform-version": "6.0",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36',
        },
        withCredentials: true
      }),

    }),
    CacheModule.register({ ttl: 30 * 1000 })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
