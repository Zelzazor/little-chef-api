import {
  Controller,
  Get,
  Param,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Auth } from '../authz/auth.decorator';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get('submission')
  @Auth()
  async findOne(@Req() request: RawBodyRequest<Request>) {
    return await this.voteService.randomUnvotedSubmission(
      request.user?.id || '',
    );
  }

  @Post(':id')
  @Auth()
  async postVote(
    @Req() request: RawBodyRequest<Request>,
    @Param('id') submissionId: string,
  ) {
    return await this.voteService.voteSubmission();
  }
}
