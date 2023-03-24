import { Body, Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthzService } from './authz.service';
import { GetTokenRequestDTO } from './dto/get-token.request.dto';
import { GetTokenResponseDTO } from './dto/get-token.response.dto';

@Controller('auth')
export class AuthzController {
  constructor(
    private authzService: AuthzService,
    private configService: ConfigService,
  ) {}

  @Get('token')
  async getToken(
    @Body() credentials: GetTokenRequestDTO,
  ): Promise<GetTokenResponseDTO> {
    if ((await this.configService.getOrThrow('NODE_ENV')) !== 'development')
      throw Error('Unauthorized access attempt to development endpoint');
    return await this.authzService.getToken(credentials);
  }
}
