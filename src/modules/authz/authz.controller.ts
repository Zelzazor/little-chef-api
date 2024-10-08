import { Body, Controller, Get } from '@nestjs/common';
import { AuthzService } from './authz.service';
import { GetTokenRequestDTO } from './dto/get-token.request.dto';
import { GetTokenResponseDTO } from './dto/get-token.response.dto';
import { Environment } from './enums/environment.enum';
import { EnvironmentIs } from './environment/environment.decorator';

@Controller('auth')
export class AuthzController {
  constructor(private authzService: AuthzService) {}

  @Get('token')
  @EnvironmentIs(Environment.Development)
  async getToken(
    @Body() credentials: GetTokenRequestDTO,
  ): Promise<GetTokenResponseDTO> {
    return await this.authzService.getToken(credentials);
  }
}
