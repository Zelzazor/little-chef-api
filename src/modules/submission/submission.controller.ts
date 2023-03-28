import { Controller, Get } from '@nestjs/common';
import { Body, Delete, Param, Patch } from '@nestjs/common/decorators';
import { Auth } from '../authz/auth.decorator';
import { Role } from '../authz/enums/role.enum';
import { SubmissionService } from './submission.service';

@Controller('submission')
export class SubmissionController {
  constructor(private submissionService: SubmissionService) {}

  @Get()
  @Auth(Role.Admin)
  async getSubmissions() {
    return await this.submissionService.getSubmissions();
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
