import { IsOptional, IsString } from 'class-validator';

export class RandomSubmissionQueryDto {
  @IsString()
  @IsOptional()
  userId: string;
}
