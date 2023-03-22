import { IsBoolean } from 'class-validator';

export class VoteSubmissionRequestDTO {
  @IsBoolean()
  isUpvote: boolean;
}
