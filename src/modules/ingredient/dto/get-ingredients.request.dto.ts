import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { DateStringRangeDto } from '../../../common/dto/date-string-range.dto';
import { DateStringRange } from '../../../common/types/date';

export class GetIngredientsRequestDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => DateStringRangeDto)
  dateRange?: DateStringRange;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}
