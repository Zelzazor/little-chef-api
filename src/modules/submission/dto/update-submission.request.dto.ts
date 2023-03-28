import { SubmissionStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export class UpdateSubmissionRequestDto {
  @IsOptional()
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsUUID()
  recipeId: string;

  @IsOptional()
  @IsEnum(SubmissionStatus)
  status?: SubmissionStatus;
}
