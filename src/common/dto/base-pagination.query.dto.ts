import { IsNumber, IsOptional } from 'class-validator';

export class BasePaginationRequestDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  pageSize?: number;
}
