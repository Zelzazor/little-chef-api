import { Module } from '@nestjs/common';
import { AuthzModule } from '../authz/authz.module';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';

@Module({
  imports: [AuthzModule],
  controllers: [SubmissionController],
  providers: [SubmissionService],
})
export class SubmissionModule {}
