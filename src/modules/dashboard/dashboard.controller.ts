import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Auth } from '../authz/auth.decorator';
import { Role } from '../authz/enums/role.enum';
import { DashboardService } from './dashboard.service';
import { GetDashboardMetricsRequestDto } from './dto/get-dashboard-metrics-request.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('count')
  @Auth(Role.Admin)
  countAll() {
    return this.dashboardService.count();
  }
  @Post()
  @HttpCode(200)
  @Auth(Role.Admin)
  async submissionDetails(@Body() body: GetDashboardMetricsRequestDto) {
    const countSubmissions = await this.dashboardService.countSubmissionDate(
      body,
    );
    const countDeletedSubmissions =
      await this.dashboardService.countDeletedSubmissionDate(body);
    const countRecentUsers = await this.dashboardService.getNewUserCount(body);
    return {
      countSubmissions: countSubmissions.count,
      countDeletedSubmissions: countDeletedSubmissions.count,
      countRecentUsers: countRecentUsers.count,
    };
  }
}
