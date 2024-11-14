import { Module } from '@nestjs/common';
import { HmrcController } from './controller/hmrc-auth.controllers';
import { HmrcAuthService } from './services/hmrc-auth.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [HmrcController],
  providers: [HmrcAuthService],
  exports: [],
})
export class HmrcModule {}
