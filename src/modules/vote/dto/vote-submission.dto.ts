import { IsBoolean, IsString } from 'class-validator';

export class VoteSubmissionDto {
  @IsString()
  recipeId: string;

  @IsString()
  userId: string;

  @IsBoolean()
  isPositive: boolean;
}
