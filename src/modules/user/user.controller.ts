import { Controller, Get, RawBodyRequest, Req } from '@nestjs/common';
import { Request } from 'express';
import { Auth } from '../authz/auth.decorator';

@Controller('user')
export class UserController {
  @Get()
  @Auth()
  async getUser(@Req() request: RawBodyRequest<Request>) {
    return request.user;
  }

  @Get('/auth')
  async getAuthToken() {
    return;
  }
}
