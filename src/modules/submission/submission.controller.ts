import { Controller, Get } from '@nestjs/common';
import { Body, Delete, Param, Patch, Post } from '@nestjs/common/decorators';
import { Submission } from '@prisma/client';
import { PaginatedQueryResponseDto } from '../../common/dto/paginated-query.response.dto';
import { Auth } from '../authz/auth.decorator';
import { Role } from '../authz/enums/role.enum';
import { UpdateUserResponseDto } from '../user/dto/update-user.response.dto';
import { CreateSubmissionRequestDto } from './dto/create-submission.request.dto';
import { CreateSubmissionResponseDto } from './dto/create-submission.response.dto';
import { DeleteSubmissionResponseDto } from './dto/delete-submission.response.dto';
import { GetSubmissionsRequestDto } from './dto/get-submissions.request.dto';
import { GetSubmissionsResponseDto } from './dto/get-submissions.response.dto';
import { UpdateSubmissionRequestDto } from './dto/update-submission.request.dto';
import { SubmissionService } from './submission.service';

@Controller('submission')
export class SubmissionController {
  constructor(private submissionService: SubmissionService) {}

  @Get()
  async getSubmissions(
    @Body() body: GetSubmissionsRequestDto,
  ): Promise<PaginatedQueryResponseDto<Submission[]>> {
    return await this.submissionService.getSubmissions(body);
  }

  @Post()
  @Auth()
  async createSubmission(
    @Body() body: CreateSubmissionRequestDto,
  ): Promise<CreateSubmissionResponseDto> {
    return await this.submissionService.createSubmission(body);
  }

  @Patch(':id')
  @Auth(Role.Admin)
  async updateSubmission(
    @Param('id') id: string,
    @Body() body: UpdateSubmissionRequestDto,
  ): Promise<UpdateUserResponseDto> {
    return await this.submissionService.updateSubmission(id, body);
  }

  @Delete(':id')
  @Auth(Role.Admin)
  async deleteSubmission(
    @Param('id') id: string,
  ): Promise<DeleteSubmissionResponseDto> {
    return await this.submissionService.deleteSubmission(id);
  }
}
