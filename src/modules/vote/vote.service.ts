import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}
  voteSubmission() {
    return { msg: 'submission voted' };
  }

  async randomUnvotedSubmission(id: string) {
    const votedSubmissionsIds: any = (
      await this.prisma.submissionVote.findMany({
        select: { submissionId: true },
        where: { userId: id },
      })
    ).map((items) => items.submissionId);

    const where = { NOT: { id: { in: votedSubmissionsIds } } };

    const unvotedSubmissionsCount = await this.prisma.submission.count({
      where,
    });
    const skip = Math.floor(Math.random() * unvotedSubmissionsCount);
    const unvotedSubmission: any = await this.prisma.submission.findMany({
      take: 1,
      skip,
      where,
    });

    return unvotedSubmission;
  }
}
