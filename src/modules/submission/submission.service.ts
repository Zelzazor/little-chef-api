import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetSubmissionsRequestDto } from './dto/get-submissions.request.dto';
import { GetSubmissionsResponseDto } from './dto/get-submissions.response.dto';

@Injectable()
export class SubmissionService {
  constructor(private prismaService: PrismaService) {}

  async getSubmissions(
    filters: GetSubmissionsRequestDto,
  ): Promise<GetSubmissionsResponseDto> {
    return {
      submissions: await this.prismaService.submission.findMany({
        where: { ...filters },
      }),
    };
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
