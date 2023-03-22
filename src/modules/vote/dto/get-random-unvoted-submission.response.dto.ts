import { Submission } from '@prisma/client';

export class GetRandomUnvotedSubmissionResponseDto {
  submission: Submission;
}
