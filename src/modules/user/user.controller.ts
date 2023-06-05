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
}
