import { IsArray, IsOptional, IsUUID } from 'class-validator';

export class FindRecipesBodyDto {
  @IsArray()
  @IsUUID(4, { each: true })
  @IsOptional()
  tags?: string[];

  @IsArray()
  @IsUUID(4, { each: true })
  @IsOptional()
  ingredients?: string[];
}
