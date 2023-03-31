import { BasePaginationQueryDto } from '../../../common/dto/base-pagination.query.dto';
import { GetSubmissionsRequestDto } from '../dto/get-submissions.request.dto';

export type GetSubmissionFilters = GetSubmissionsRequestDto &
  BasePaginationQueryDto;
