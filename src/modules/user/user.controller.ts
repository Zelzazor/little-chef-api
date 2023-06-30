//user.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { BasePaginationQueryDto } from 'src/common/dto/base-pagination.query.dto';
import { Auth } from '../authz/auth.decorator';
import { Role } from '../authz/enums/role.enum';
import { ExperienceService } from '../experience/experience.service';
import { UpdateUserRequestDto } from './dto/update-user.request.dto';
import { UpdateUserResponseDto } from './dto/update-user.response.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private experienceService: ExperienceService,
  ) {}

  @Post('ban/:id')
  @Auth(Role.Admin)
  async banUser(@Param('id') id: string): Promise<User> {
    return this.userService.banUser(id);
  }

  @Get()
  @Auth()
  async getUser(@Req() request: RawBodyRequest<Request>) {
    const experience = await this.experienceService.getExperienceData({
      userId: request.user?.id ?? '',
    });
    return { ...request.user, experience };
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
  @Post('unban/:id')
  @Auth(Role.Admin)
  async unbanUser(@Param('id') id: string): Promise<User> {
    return this.userService.unbanUser(id);
  }
}
