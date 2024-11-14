import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { XamaContactService } from '../services/xama-contact.service';
import { ContactDto } from '../dto/contact.dto';
import { AddContactDto } from '../dto/AddContact.dto';

@Controller('contact')
export class XamaContactApiController {
  constructor(private readonly contactService: XamaContactService) {}

  /**
   * POST endpoint to add a contact to a client's account
   * @param token - Bearer token from the Authorization header
   * @param clientId - The client ID
   * @param accountId - The account ID
   */
  @Get('/clients/:clientId/accounts/:accountId/contacts')
  async getSingleClientContact(
    @Headers('Authorization') token: string,
    @Param('clientId') clientId: string,
    @Param('accountId') accountId: string,
  ) {
    if (!token || !token.startsWith('Bearer ')) {
      throw new Error('Authorization header must include a Bearer token');
    }
    const bearerToken = token.split(' ')[1];
    return this.contactService.getSingleClientContact(
      clientId,
      accountId,
      bearerToken,
    );
  }

  /**
   * POST endpoint to create a contact for a specific client and account
   * @param contactDto - The request body containing contact data
   * @param token - Bearer token from the Authorization header
   * @param clientId - The client ID
   * @param accountId - The account ID
   */
  @Post('/:clientId/accounts/contacts')
  async createContact(
    @Body() contactDto: ContactDto,
    @Headers('Authorization') token: string,
    @Param('clientId') clientId: string,
  ) {
    if (!token || !token.startsWith('Bearer ')) {
      throw new Error('Authorization header must include a Bearer token');
    }

    const bearerToken = token.split(' ')[1];
    return this.contactService.createContact(contactDto, bearerToken, clientId);
  }

  /**
   * GET endpoint to fetch all contacts for a specific client and account
   * @param token - Bearer token from the Authorization header
   * @param clientId - The client ID
   * @param accountId - The account ID
   */
  @Get('/:clientId/accounts/contacts')
  async getAllContacts(
    @Headers('Authorization') token: string,
    @Param('clientId') clientId: string,
  ) {
    if (!token || !token.startsWith('Bearer ')) {
      throw new Error('Authorization header must include a Bearer token');
    }

    const bearerToken = token.split(' ')[1];
    return this.contactService.getAllContacts(bearerToken, clientId);
  }

  /**
   * POST endpoint to add a contact to a client's account
   * @param token - Bearer token from the Authorization header
   * @param clientId - The client ID
   * @param accountId - The account ID
   * @param contactDto - Contact data
   */
  @Post('/clients/:clientId/accounts/:accountId/contacts/add')
  async addContact(
    @Headers('Authorization') token: string,
    @Param('clientId') clientId: string,
    @Param('accountId') accountId: string,
    @Body() contactDto: AddContactDto,
  ) {
    if (!token || !token.startsWith('Bearer ')) {
      throw new Error('Authorization header must include a Bearer token');
    }

    const bearerToken = token.split(' ')[1];
    return this.contactService.addContact(
      clientId,
      accountId,
      bearerToken,
      contactDto,
    );
  }

  /**
   * POST endpoint to add a contact to a client's account
   * @param token - Bearer token from the Authorization header
   * @param clientId - The client ID
   * @param accountId - The account ID
   * @param contactDto - Contact data
   */
  @Delete('/:clientId/accounts/:accountId/contacts/:contactId/remove')
  async removeContactFromClient(
    @Headers('Authorization') token: string,
    @Param('clientId') clientId: string,
    @Param('accountId') accountId: string,
    @Param('contactId') contactId: string,
  ) {
    if (!token || !token.startsWith('Bearer ')) {
      throw new Error('Authorization header must include a Bearer token');
    }

    const bearerToken = token.split(' ')[1];
    return this.contactService.removeContact(
      clientId,
      accountId,
      bearerToken,
      contactId,
    );
  }

  /**
   * PUT endpoint to update a contact record with onboarding data
   * @param clientId - The client ID
   * @param accountId - The account ID
   * @param contactId - The contact ID
   * @param contactDto - The updated contact data
   * @param token - Bearer token from the Authorization header
   */
  @Put('/clients/:clientId/accounts/:accountId/contacts/:contactId')
  async updateContact(
    @Param('clientId') clientId: string,
    @Param('accountId') accountId: string,
    @Param('contactId') contactId: string,
    @Body() contactDto: ContactDto,
    @Headers('Authorization') token: string,
  ): Promise<any> {
    if (!token || !token.startsWith('Bearer ')) {
      throw new HttpException(
        'Authorization header must include a Bearer token',
        401,
      );
    }

    const bearerToken = token.split(' ')[1];
    return this.contactService.addCollectedDataToContact(
      clientId,
      accountId,
      contactId,
      bearerToken,
    );
  }
}
