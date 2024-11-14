import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HmrcAuthService {
  private readonly clientId = 'KaKioEnl72ChNZJUSCfcIjBI3DCJ';
  private readonly clientSecret = 'd9ee10b4-2381-446a-83bf-43221c0c80b9';
  private readonly redirectUri = 'http://localhost:8080/hmrc/oauth20/callback';
  private readonly apiBaseUrlSandbox = 'https://test-api.service.hmrc.gov.uk/';
  private readonly serviceName = 'hello';
  private readonly serviceVersion = '1.0';
  private readonly oauthScope = 'hello';

  // Authorization URL for the OAuth2 flow
  public getAuthorizationUri(): string {
    const authUrl = `${this.apiBaseUrlSandbox}oauth/authorize`;

    const queryParams = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.oauthScope,
    });
    return `${authUrl}?${queryParams.toString()}`;
  }

  // Exchange authorization code for access token
  public async getUserAccessToken(code: string): Promise<string> {
    const tokenUrl = `${this.apiBaseUrlSandbox}oauth/token`;
    try {
      const response = await axios.post(
        tokenUrl,
        new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: this.redirectUri,
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }).toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );
      return response.data.access_token;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch access token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  // Call HMRC API
  public async callApi(resource: string, accessToken?: string): Promise<any> {
    const url = `${this.apiBaseUrlSandbox}${this.serviceName}${resource}`;
    console.log('Uri ====>', url);
    const headers = {
      Accept: `application/vnd.hmrc.${this.serviceVersion}+json`,
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Failed to fetch API data',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
