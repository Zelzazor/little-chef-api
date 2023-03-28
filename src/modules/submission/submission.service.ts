import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SubmissionService {
  constructor(private prismaService: PrismaService) {}

  async getSubmissions() {
    return await this.prismaService.submission.findMany();
  }
}
