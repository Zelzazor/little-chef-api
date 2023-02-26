import { Controller, Get, RawBodyRequest, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard()) // Temporal
  @Get()
  async getUser(@Req() request: RawBodyRequest<any>) {
    return this.userService.getUserBySubject(request?.user?.sub);
  }

  @Get('/auth')
  async getAuthToken() {
    return;
  }
}
