import { Module } from '@nestjs/common';
import { AuthzModule } from '../authz/authz.module';
import { ExperienceService } from './experience.service';

@Module({
  imports: [AuthzModule],
  providers: [ExperienceService],
  exports: [ExperienceService],
})
export class ExperienceModule {}
