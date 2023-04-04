import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { BasePaginationQueryDto } from './../../../common/dto/base-pagination.query.dto';

export class FindRecipesQueryDto extends BasePaginationQueryDto {
  @IsOptional()
  @IsString()
  name?: string;
}

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

export type FindRecipesDto = FindRecipesQueryDto & FindRecipesBodyDto;
