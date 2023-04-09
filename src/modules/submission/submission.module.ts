import { Module } from '@nestjs/common';
import { AuthzModule } from '../authz/authz.module';
import { S3UploadModule } from '../s3-upload/s3-upload.module';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';

@Module({
  imports: [AuthzModule, S3UploadModule],
  controllers: [SubmissionController],
  providers: [SubmissionService],
})
export class SubmissionModule {}
