import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { ContactDto } from '../dto/contact.dto';
import { AddContactDto } from '../dto/AddContact.dto';

@Injectable()
export class XamaContactService {
  private readonly externalApiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    // Fetch the base API URL from environment variables
    this.externalApiUrl = this.configService.get<string>('XAMA_BASE_URL');
  }

  /**
   * Create a contact for a specific client and account.
   * @param contactDto - The contact data
   * @param token - Bearer token for authentication
   * @param clientId - The client ID
   * @param accountId - The account ID
   */
  async createContact(
    contactDto: ContactDto,
    token: string,
    clientId: string,
  ): Promise<any> {
    const url = `${this.externalApiUrl}/clients/${clientId}/accounts`;
    console.log('Here ====>', contactDto);
    try {
      const response = await lastValueFrom(
        this.httpService.post(url, contactDto, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to create contact',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Fetch all contacts for a specific client and account.
   * @param token - Bearer token for authentication
   * @param clientId - The client ID
   * @param accountId - The account ID
   */
  async getAllContacts(token: string, clientId: string): Promise<any> {
    const url = `${this.externalApiUrl}/clients/${clientId}/accounts`;

    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to fetch contacts',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Existing properties and constructor omitted for brevity

  /**
   * Add a contact to a specific client's account
   * @param clientId - Client ID
   * @param accountId - Account ID
   * @param token - Bearer token
   * @param contactDto - Contact data
   */
  async addContact(
    clientId: string,
    accountId: string,
    token: string,
    contactDto: AddContactDto,
  ): Promise<any> {
    const url = `${this.externalApiUrl}/clients/${clientId}/accounts/${accountId}/contacts`;

    try {
      const response = await lastValueFrom(
        this.httpService.post(url, contactDto, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to add contact',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Add a contact to a specific client's account
   * @param clientId - Client ID
   * @param accountId - Account ID
   * @param token - Bearer token
   * @param contactDto - Contact data
   */
  async removeContact(
    clientId: string,
    accountId: string,
    token: string,
    contactId,
  ): Promise<any> {
    const url = `${this.externalApiUrl}/clients/${clientId}/accounts/${accountId}/contacts/${contactId}`;

    try {
      const response = await lastValueFrom(
        this.httpService.delete(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to add contact',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  /**
   * Add a contact to a specific client's account
   * @param clientId - Client ID
   * @param accountId - Account ID
   * @param token - Bearer token
   */
  async getSingleClientContact(
    clientId: string,
    accountId: string,
    token: string,
  ): Promise<any> {
    const url = `${this.externalApiUrl}/clients/${clientId}/accounts/${accountId}/contacts`;

    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to add contact',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Update a contact with onboarding data
   * @param clientId - The client ID
   * @param accountId - The account ID
   * @param contactId - The contact ID
   * @param contactDto - Updated contact data
   * @param token - Bearer token
   */
  async addCollectedDataToContact(
    clientId: string,
    accountId: string,
    contactId: string,
    token: string,
  ): Promise<any> {
    const url = `${this.externalApiUrl}/clients/${clientId}/accounts/${accountId}/contacts/${contactId}`;

    console.log('Here Collected Dat====>');
    try {
      const response = await lastValueFrom(
        this.httpService.put(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to update contact',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
