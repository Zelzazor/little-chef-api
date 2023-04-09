import { IsUUID } from 'class-validator';

export class CreateSubmissionRequestDto {
  @IsUUID()
  recipeId: string;
}
