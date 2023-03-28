import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SubmissionService {
  constructor(private prismaService: PrismaService) {}

  async getSubmissions() {
    return await this.prismaService.submission.findMany();
  }

  async createSubmission(submission: any) {
    const createdSubmission = await this.prismaService.submission.create({
      data: { ...submission },
    });

    return { success: Boolean(createdSubmission) };
  }

  async updateSubmission(updatedSubmission: any) {
    const resultingSubmission = await this.prismaService.submission.update({
      where: { id: updatedSubmission.id },
      data: { ...updatedSubmission },
    });

    return { success: Boolean(resultingSubmission) };
  }

  async deleteSubmission(id: any) {
    const deletedSubmission = await this.prismaService.submission.delete({
      where: { id },
    });

    return { success: Boolean(deletedSubmission) };
  }
}
