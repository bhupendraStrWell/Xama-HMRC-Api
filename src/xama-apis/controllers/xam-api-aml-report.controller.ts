import {
  Body,
  Controller,
  Headers,
  Param,
  Put,
  HttpException,
  Get,
} from '@nestjs/common';
import { AMLReportService } from '../services/aml-report.service';
import { AMLReportDto } from '../dto/aml-report-dto';

@Controller('aml-report')
export class AMLReportController {
  constructor(private readonly amlReportService: AMLReportService) {}

  /**
   * PUT endpoint to initiate AML Report
   * @param clientId - Client ID
   * @param accountId - Account ID
   * @param contactId - Contact ID
   * @param amlReportDto - AML report data
   * @param token - Bearer token from the Authorization header
   */
  @Put('/clients/:clientId/accounts/:accountId/contacts/:contactId/reports/aml')
  async initiateAMLReport(
    @Param('clientId') clientId: string,
    @Param('accountId') accountId: string,
    @Param('contactId') contactId: string,
    @Body() amlReportDto: AMLReportDto,
    @Headers('Authorization') token: string,
  ): Promise<any> {
    if (!token || !token.startsWith('Bearer ')) {
      throw new HttpException(
        'Authorization header must include a Bearer token',
        401,
      );
    }

    const bearerToken = token.split(' ')[1];

    return this.amlReportService.initiateAMLReport(
      clientId,
      accountId,
      contactId,
      amlReportDto,
      bearerToken,
    );
  }

  /**
   * PUT endpoint to initiate AML Report
   * @param clientId - Client ID
   * @param accountId - Account ID
   * @param contactId - Contact ID
   * @param amlReportDto - AML report data
   * @param token - Bearer token from the Authorization header
   */
  @Get('/clients/:clientId/accounts/:accountId/contacts/:contactId/reports/aml')
  async getAMLReport(
    @Param('clientId') clientId: string,
    @Param('accountId') accountId: string,
    @Param('contactId') contactId: string,
    // @Body() amlReportDto: AMLReportDto,
    @Headers('Authorization') token: string,
  ): Promise<any> {
    if (!token || !token.startsWith('Bearer ')) {
      throw new HttpException(
        'Authorization header must include a Bearer token',
        401,
      );
    }

    const bearerToken = token.split(' ')[1];

    return this.amlReportService.getAMLReport(
      clientId,
      accountId,
      contactId,
      bearerToken,
    );
  }
}
