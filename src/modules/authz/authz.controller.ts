import { Body, Controller, Get } from '@nestjs/common';
import { AuthzService } from './authz.service';

@Controller('auth')
export class AuthzController {
  constructor(private authzService: AuthzService) {}

  @Get('token')
  async getToken(@Body() credentials: any): Promise<any> {
    return await this.authzService.getToken(credentials);
  }
}
