import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { AMLReportDto } from '../dto/aml-report-dto';

@Injectable()
export class AMLReportService {
  private readonly externalApiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.externalApiUrl = this.configService.get<string>('XAMA_BASE_URL');
  }

  /**
   * Initiate AML Report
   * @param clientId - Client ID
   * @param accountId - Account ID
   * @param contactId - Contact ID
   * @param amlReportDto - AML report data
   * @param token - Bearer token
   */
  async initiateAMLReport(
    clientId: string,
    accountId: string,
    contactId: string,
    amlReportDto: AMLReportDto,
    token: string,
  ): Promise<any> {
    const url = `${this.externalApiUrl}/clients/${clientId}/accounts/${accountId}/contacts/${contactId}/reports/aml`;
    console.log('DAta  ====>', clientId, accountId, contactId);
    try {
      const response = await lastValueFrom(
        this.httpService.put(
          url,
          { amlReportDto },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );

      // A successful AML report initiation returns 204 (No Content)
      if (response.status === 204) {
        return { message: 'AML report initiated successfully' };
      }

      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to initiate AML report',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Initiate AML Report
   * @param clientId - Client ID
   * @param accountId - Account ID
   * @param contactId - Contact ID
   * @param amlReportDto - AML report data
   * @param token - Bearer token
   */
  async getAMLReport(
    clientId: string,
    accountId: string,
    contactId: string,
    token: string,
  ): Promise<any> {
    const url = `${this.externalApiUrl}/clients/${clientId}/accounts/${accountId}/contacts/${contactId}/reports/aml`;
    console.log('DAta  ====>', clientId, accountId, contactId);
    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
      );

      // A successful AML report initiation returns 204 (No Content)
      if (response.status === 204) {
        return { message: 'AML report initiated successfully' };
      }

      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to initiate AML report',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
