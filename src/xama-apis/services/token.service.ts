import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { TokenRequestDto } from '../dto/token-request.dto';

@Injectable()
export class TokenService {
  private readonly authUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    // Fetch the API URL from environment variables
    this.authUrl = this.configService.get<string>(
      'AUTH_PROXY_URL',
      'https://auth-proxy.xamatech.com/oauth/token',
    );
  }

  /**
   * Request an access token from the external API
   * @param tokenRequestDto - The request body
   */
  async getAccessToken(tokenRequestDto: TokenRequestDto): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(this.authUrl, tokenRequestDto, {
          headers: { 'Content-Type': 'application/json' },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to fetch access token',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
