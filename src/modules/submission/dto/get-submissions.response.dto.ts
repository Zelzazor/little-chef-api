import { Submission } from '@prisma/client';

export class GetSubmissionsResponseDto {
  submissions: Submission[];
}
