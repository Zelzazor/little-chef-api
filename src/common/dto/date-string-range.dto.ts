import { IsDateString, IsOptional } from 'class-validator';

export class DateStringRangeDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
