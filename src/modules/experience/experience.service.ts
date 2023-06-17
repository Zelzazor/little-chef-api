import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExperienceService {
  constructor(private prismaService: PrismaService) {}
  async getExperienceData({ userId }: { userId: string }) {
    const experience = await this.prismaService.experienceGain.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
      },
    });
    const sum = experience._sum.amount ?? 0;
    const result = this.getPlayerLevel(sum);
    return result;
  }

  getPlayerLevel(experience = 0) {
    const level =
      experience < 50 ? 0 : Math.floor(Math.log2(experience / 50)) + 1;
    const expToNextLevel = 50 * 2 ** level - experience;
    const expInCurrentLevel =
      experience < 50
        ? experience
        : experience - Math.floor((50 * 2 ** level) / 2);
    return { level, expToNextLevel, expInCurrentLevel };
  }

  async addExperience({
    userId,
    amount,
    submissionId,
    experienceGainTypeId,
  }: {
    userId: string;
    amount: number;
    submissionId: string;
    experienceGainTypeId: string;
  }) {
    const experience = await this.prismaService.experienceGain.create({
      data: {
        amount,
        userId,
        submissionId,
        experienceGainTypeId,
      },
    });
    return experience;
  }
}
