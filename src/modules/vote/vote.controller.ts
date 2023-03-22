import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Auth } from '../authz/auth.decorator';
import { VoteSubmissionRequestDTO } from './dto/vote-submission.request.dto';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get('submission')
  @Auth()
  async getRandomUnvotedSubmission(@Req() request: RawBodyRequest<Request>) {
    return await this.voteService.getRandomUnvotedSubmission(
      request.user?.id || '',
    );
  }

  @Post(':id')
  @Auth()
  async voteSubmission(
    @Body() body: VoteSubmissionRequestDTO,
    @Req() request: RawBodyRequest<Request>,
    @Param('id') submissionId: string,
  ) {
    return await this.voteService.voteSubmission(
      request.user?.id || '',
      submissionId,
      body.isUpvote,
    );
  }
}
