import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from '../services/token.service';
import { TokenRequestDto } from '../dto/token-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly tokenService: TokenService) {}

  /**
   * POST endpoint to fetch an access token
   * @param tokenRequestDto - The request body containing client credentials
   */
  @Post('token')
  async getToken(@Body() tokenRequestDto: TokenRequestDto) {
    return this.tokenService.getAccessToken(tokenRequestDto);
  }
}
