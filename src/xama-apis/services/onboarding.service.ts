import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { HttpStatusCode } from 'axios';

@Injectable()
export class XamaOnboardingService {
  private readonly externalApiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.externalApiUrl = this.configService.get<string>('XAMA_BASE_URL');
  }

  /**
   * Trigger an onboarding request for a contact
   * @param clientId - The client ID
   * @param accountId - The account ID
   * @param contactId - The contact ID
   * @param token - Bearer token
   */
  async triggerOnboarding(
    clientId: string,
    accountId: string,
    contactId: string,
    token: string,
  ): Promise<any> {
    const url = `${this.externalApiUrl}/clients/${clientId}/accounts/${accountId}/contacts/${contactId}/reports/onboarding`;

    try {
      const response = await lastValueFrom(
        this.httpService.put(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );
      console.log('Here ====>', response.status == 204);

      if (response.status == 204) {
        return {
          status: response.status,
          message: 'Onboarding Request Sent Successfully',
        };
      } else {
        return {
          status: HttpStatusCode.BadRequest,
          message: 'Failed to  Send Onboarding Request.',
        };
      }
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to trigger onboarding',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Retrieve all onboarding requests for a contact
   * @param clientId - The client ID
   * @param accountId - The account ID
   * @param contactId - The contact ID
   * @param token - Bearer token
   */
  async getOnboardingRequests(
    clientId: string,
    accountId: string,
    contactId: string,
    token: string,
  ): Promise<any> {
    const url = `${this.externalApiUrl}/clients/${clientId}/accounts/${accountId}/contacts/${contactId}/reports/onboarding`;

    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to retrieve onboarding requests',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Retrieve all onboarding requests for a contact
   * @param clientId - The client ID
   * @param accountId - The account ID
   * @param contactId - The contact ID
   * @param token - Bearer token
   */
  async getManualPassOnboarding(
    clientId: string,
    accountId: string,
    contactId: string,
    token: string,
    manualPassDto,
  ): Promise<any> {
    const url = `${this.externalApiUrl}/clients/${clientId}/accounts/${accountId}/contacts/${contactId}/reports/onboarding`;

    try {
      console.log('Manual Pass====>', manualPassDto);
      const response = await lastValueFrom(
        this.httpService.patch(
          url,
          { manualPassDto },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to retrieve onboarding requests',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
