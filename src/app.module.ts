import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule.register({
    headers: {
      'User-Agent': 'Chrome/95.0.4638.54'
    },
    withCredentials: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
