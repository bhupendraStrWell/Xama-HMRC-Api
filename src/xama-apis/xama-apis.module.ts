import { Module } from '@nestjs/common';
import { XamaHttpApisService } from './services/xama-apis.service';
import { XamaApisController } from './controllers/xama-apis.controller';
import { HttpModule } from '@nestjs/axios/dist';
import { AuthController } from './controllers/xam-api-auth.controller';
import { TokenService } from './services/token.service';
import { XamaContactApiController } from './controllers/xama-api-contact.controller';
import { XamaContactService } from './services/xama-contact.service';
import { XamaOnboardingController } from './controllers/xama-api-onboarding.controller';
import { XamaOnboardingService } from './services/onboarding.service';
import { AMLReportController } from './controllers/xam-api-aml-report.controller';
import { AMLReportService } from './services/aml-report.service';

@Module({
  imports: [HttpModule],
  controllers: [
    XamaApisController,
    AuthController,
    XamaContactApiController,
    XamaOnboardingController,
    AMLReportController,
  ],
  providers: [
    XamaHttpApisService,
    TokenService,
    XamaContactService,
    XamaOnboardingService,
    AMLReportService,
  ],
})
export class XamaApisModule {}
