import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { DateStringRangeDto } from 'src/common/dto/date-string-range.dto';
import { DateStringRange } from 'src/common/types/date';

export class GetDashboardMetricsRequestDto {
  @IsOptional()
  @Type(() => DateStringRangeDto)
  dateRange?: DateStringRange;
}
