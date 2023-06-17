import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { BasePaginationQueryDto } from 'src/common/dto/base-pagination.query.dto';
import { Auth } from '../authz/auth.decorator';
import { Role } from '../authz/enums/role.enum';
import { UpdateUserRequestDto } from './dto/update-user.request.dto';
import { UpdateUserResponseDto } from './dto/update-user.response.dto';
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
  @Auth()
  async updateUser(
    @Req() request: RawBodyRequest<Request>,
    @Body() body: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    const updatedUser = {
      ...body,
      birthDate: body.birthDate ? new Date(body.birthDate) : undefined,
      subject: request.user?.subject,
      id: request.user?.id,
    };

    return await this.userService.updateUser(updatedUser);
  }
  @Get('all')
  @Auth(Role.Admin)
  getAllUsers(@Query() { page, pageSize }: BasePaginationQueryDto) {
    console.log(page, pageSize);
    return this.userService.getAllUsers({ page, pageSize });
  }
}
