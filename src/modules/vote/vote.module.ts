import { Module } from '@nestjs/common';
import { ExperienceModule } from '../experience/experience.module';
import { AuthzModule } from './../authz/authz.module';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';

@Module({
  imports: [AuthzModule, ExperienceModule],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
