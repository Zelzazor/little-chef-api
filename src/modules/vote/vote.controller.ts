import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RandomSubmissionQueryDto } from './dto/random-submission-query.dto';
import { VoteSubmissionDto } from './dto/vote-submission.dto';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get('random')
  getRandomSubmission(@Query() { userId }: RandomSubmissionQueryDto) {
    return this.voteService.getRandomSubmission(userId);
  }

  @Post()
  voteSubmission(@Body() voteSubmissionDto: VoteSubmissionDto) {
    return this.voteService.voteSubmission(voteSubmissionDto);
  }
}
