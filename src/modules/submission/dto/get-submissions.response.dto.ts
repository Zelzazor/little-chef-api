import { Submission } from '@prisma/client';
import { BasePaginationResponseDto } from '../../../common/dto/base-pagination.response.dto';

export class GetSubmissionsResponseDto {
  submissions: Submission[];
}
