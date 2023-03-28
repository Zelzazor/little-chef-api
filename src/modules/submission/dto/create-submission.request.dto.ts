import { IsUUID } from 'class-validator';

export class CreateSubmissionRequestDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  recipeId: string;
}
