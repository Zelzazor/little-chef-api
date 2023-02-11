import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt')) // Temporal
  @Get()
  async test() {
    return;
  }

  @Get('/auth')
  async getAuthToken() {
    return;
  }
}
