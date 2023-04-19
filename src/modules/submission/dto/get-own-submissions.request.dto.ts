import { SubmissionStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { DateStringRangeDto } from '../../../common/dto/date-string-range.dto';
import { DateStringRange } from '../../../common/types/date';

export class GetOwnSubmissionsRequestDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsEnum(SubmissionStatus)
  status?: SubmissionStatus;

  @IsOptional()
  @IsUUID()
  recipeId?: string;

  @IsOptional()
  @Type(() => DateStringRangeDto)
  dateRange?: DateStringRange;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}
