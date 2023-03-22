import { Injectable } from '@nestjs/common';
import { Submission, SubmissionStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { GetRandomUnvotedSubmissionResponseDto } from './dto/get-random-unvoted-submission.response.dto';
import { VoteSubmissionResponseDTO } from './dto/vote-submission.response.dto';

@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}

  async voteSubmission(
    userId: string,
    submissionId: string,
    isUpvote: boolean,
  ): Promise<VoteSubmissionResponseDTO> {
    await this.prisma.submissionVote.create({
      data: { userId, submissionId, isUpvote: !!isUpvote },
    });

    this.prisma.submissionVote
      .findMany({
        where: { submissionId, isUpvote: true, deletedAt: null },
      })
      .then((submissionVotes) => {
        const upvotes = submissionVotes.filter((vote) => vote.isUpvote).length;
        const downvotes = submissionVotes.filter(
          (vote) => !vote.isUpvote,
        ).length;

        let status: SubmissionStatus = SubmissionStatus.PENDING;

        if (upvotes >= 3) status = SubmissionStatus.APPROVED;
        if (downvotes >= 3) status = SubmissionStatus.REJECTED;

        if (status !== SubmissionStatus.PENDING) {
          this.prisma.submission.update({
            where: {
              id: submissionId,
            },
            data: {
              status,
            },
          });
        }
      });

    return { success: true };
  }

  async getRandomUnvotedSubmission(
    id: string,
  ): Promise<GetRandomUnvotedSubmissionResponseDto> {
    const submissionsWithoutVotes = await this.prisma.submission.findMany({
      select: {
        id: true,
        imageUrl: true,
        recipeId: true,
        createdAt: true,
        updatedAt: true,
      },
      take: 5,
      where: {
        votes: { none: { userId: id } },
        status: SubmissionStatus.PENDING,
      },
    });

    const randomIndex = Math.floor(
      Math.random() * submissionsWithoutVotes.length,
    );
    const unvotedSubmission = submissionsWithoutVotes[randomIndex];

    return { submission: unvotedSubmission as Submission };
  }
}
