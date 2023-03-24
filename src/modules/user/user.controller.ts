import {
  Body,
  Controller,
  Get,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Auth } from '../authz/auth.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Auth()
  async getUser(@Req() request: RawBodyRequest<Request>) {
    return request.user;
  }

  @Post()
  async updateUser(@Req() request: RawBodyRequest<Request>, @Body() body: any) {
    return await this.userService.updateUser({
      subject: request.user?.subject,
      ...body,
    });
  }
}
