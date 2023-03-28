import { Controller, Get } from '@nestjs/common';
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
}
