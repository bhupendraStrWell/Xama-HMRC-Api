import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XamaApisModule } from './xama-apis/xama-apis.module';
import { ConfigModule } from '@nestjs/config';
import { HmrcModule } from './hmrc-apis/hmrc.module';

@Module({
  imports: [
    XamaApisModule,
    HmrcModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
      envFilePath: '.env', // Specify the path to your .env file (default is `.env`)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
