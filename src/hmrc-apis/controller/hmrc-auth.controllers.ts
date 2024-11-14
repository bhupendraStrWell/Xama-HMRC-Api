import {
  Controller,
  Get,
  Query,
  Redirect,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HmrcAuthService } from '../services/hmrc-auth.service';

@Controller('hmrc')
export class HmrcController {
  constructor(private readonly hmrcService: HmrcAuthService) {}

  // Home route
  @Get('/')
  async home(): Promise<any> {
    console.log('Here ====>');
    return {
      service: 'hello (v1.0)',
      endpoints: {
        unrestrictedCall: '/hmrc/unrestricted-call',
        applicationCall: '/hmrc/application-call',
        userCall: '/hmrc/user-call',
      },
    };
  }

  // Unrestricted endpoint call
  @Get('/unrestricted-call')
  async unrestrictedCall(): Promise<any> {
    try {
      return await this.hmrcService.callApi('/world');
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // User-restricted call with redirect to authorization URL
  @Get('/user-call')
  @Redirect()
  userCall(): { url: string } {
    const authUri = this.hmrcService.getAuthorizationUri();
    return { url: authUri };
  }

  // Callback handler after user authorization
  @Get('/oauth20/callback')
  async oauthCallback(@Query('code') code: string): Promise<any> {
    try {
      console.log('Here ====>');
      const accessToken = await this.hmrcService.getUserAccessToken(code);
      return { message: 'Authentication successful', accessToken };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Application-restricted API call
  @Get('/application-call')
  async applicationCall(): Promise<any> {
    try {
      const accessToken =
        await this.hmrcService.getUserAccessToken('APPLICATION_CODE'); // Replace with actual logic if needed
      return await this.hmrcService.callApi('/application', accessToken);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
