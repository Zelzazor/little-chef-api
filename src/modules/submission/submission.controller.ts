import { Controller, Get } from '@nestjs/common';
import { Body, Delete, Param, Patch, Post } from '@nestjs/common/decorators';
import { Auth } from '../authz/auth.decorator';
import { Role } from '../authz/enums/role.enum';
import { GetSubmissionsRequestDto } from './dto/get-submissions.request.dto';
import { GetSubmissionsResponseDto } from './dto/get-submissions.response.dto';
import { SubmissionService } from './submission.service';

@Controller('submission')
export class SubmissionController {
  constructor(private submissionService: SubmissionService) {}

  @Get()
  @Auth(Role.Admin)
  async getSubmissions(
    @Body() body: GetSubmissionsRequestDto,
  ): Promise<GetSubmissionsResponseDto> {
    return await this.submissionService.getSubmissions(body);
  }

  @Post()
  @Auth()
  async createSubmission(@Body() body: any) {
    return await this.submissionService.createSubmission(body);
  }

  @Patch(':id')
  @Auth(Role.Admin)
  async updateSubmission(@Param('id') id: any, @Body() body: any) {
    return await this.submissionService.updateSubmission({
      ...body,
      id,
    });
  }

  @Delete(':id')
  @Auth(Role.Admin)
  async deleteSubmission(@Param('id') id: any) {
    return await this.submissionService.deleteSubmission(id);
  }
}
