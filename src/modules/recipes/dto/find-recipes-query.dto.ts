import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FindRecipesQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumberString()
  limit?: number;

  @IsOptional()
  @IsNumberString()
  skip?: number;
}
