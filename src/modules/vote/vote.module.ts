import { Module } from '@nestjs/common';
import { AuthzModule } from './../authz/authz.module';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';

@Module({
  imports: [AuthzModule],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
