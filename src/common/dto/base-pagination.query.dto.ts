import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class BasePaginationQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pageSize?: number;
}
