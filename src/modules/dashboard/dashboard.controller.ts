import { Controller, Get } from '@nestjs/common';
import { Auth } from '../authz/auth.decorator';
import { Role } from '../authz/enums/role.enum';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('count')
  @Auth(Role.Admin)
  countAll() {
    return this.dashboardService.count();
  }
  @Get('submission')
  @Auth(Role.Admin)
  async submissionDetails() {
    const countDate = await this.dashboardService.countSubmissionDate();
    const deletedDate =
      await this.dashboardService.countDeletedSubmissionDate();
    const countRecentUser = await this.dashboardService.getNewUserCount();
    return { countDate, deletedDate, countRecentUser };
  }
}
