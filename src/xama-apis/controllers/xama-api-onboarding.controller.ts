import {
  Controller,
  Headers,
  Param,
  Put,
  Get,
  HttpException,
  Patch,
  Body,
} from '@nestjs/common';
import { XamaOnboardingService } from '../services/onboarding.service';

@Controller('onboarding')
export class XamaOnboardingController {
  constructor(private readonly onboardingService: XamaOnboardingService) {}

  /**
   * PUT endpoint to trigger onboarding request
   * @param clientId - The client ID
   * @param accountId - The account ID
   * @param contactId - The contact ID
   * @param token - Bearer token from the Authorization header
   */
  @Put(
    '/clients/:clientId/accounts/:accountId/contacts/:contactId/reports/onboarding',
  )
  async triggerOnboarding(
    @Param('clientId') clientId: string,
    @Param('accountId') accountId: string,
    @Param('contactId') contactId: string,
    @Headers('Authorization') token: string,
  ): Promise<void> {
    if (!token || !token.startsWith('Bearer ')) {
      throw new HttpException(
        'Authorization header must include a Bearer token',
        401,
      );
    }

    const bearerToken = token.split(' ')[1];
    return await this.onboardingService.triggerOnboarding(
      clientId,
      accountId,
      contactId,
      bearerToken,
    );
  }

  /**
   * PATCH endpoint to trigger manual pass
   * @param clientId - The client ID
   * @param accountId - The account ID
   * @param contactId - The contact ID
   * @param token - Bearer token from the Authorization header
   */
  @Patch(
    '/clients/:clientId/accounts/:accountId/contacts/:contactId/reports/onboarding',
  )
  async ManualPassReport(
    @Param('clientId') clientId: string,
    @Param('accountId') accountId: string,
    @Param('contactId') contactId: string,
    @Headers('Authorization') token: string,
    @Body() manualPassDto: any,
  ): Promise<void> {
    if (!token || !token.startsWith('Bearer ')) {
      throw new HttpException(
        'Authorization header must include a Bearer token',
        401,
      );
    }

    const bearerToken = token.split(' ')[1];
    return await this.onboardingService.getManualPassOnboarding(
      clientId,
      accountId,
      contactId,
      bearerToken,
      manualPassDto,
    );
  }

  /**
   * GET endpoint to retrieve onboarding requests
   * @param clientId - The client ID
   * @param accountId - The account ID
   * @param contactId - The contact ID
   * @param token - Bearer token from the Authorization header
   */
  @Get(
    '/clients/:clientId/accounts/:accountId/contacts/:contactId/reports/onboarding',
  )
  async getOnboardingRequests(
    @Param('clientId') clientId: string,
    @Param('accountId') accountId: string,
    @Param('contactId') contactId: string,
    @Headers('Authorization') token: string,
  ): Promise<any> {
    if (!token || !token.startsWith('Bearer ')) {
      throw new HttpException(
        'Authorization header must include a Bearer token',
        401,
      );
    }

    const bearerToken = token.split(' ')[1];
    return this.onboardingService.getOnboardingRequests(
      clientId,
      accountId,
      contactId,
      bearerToken,
    );
  }
}
