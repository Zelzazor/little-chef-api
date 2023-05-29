import { Injectable } from '@nestjs/common';
import { RecipesService } from '../recipes/recipes.service';
import { SubmissionService } from '../submission/submission.service';
import { UserService } from '../user/user.service';
import { GetDashboardMetricsRequestDto } from './dto/get-dashboard-metrics-request.dto';

@Injectable()
export class DashboardService {
  constructor(
    private recipeService: RecipesService,
    private submissionService: SubmissionService,
    private userService: UserService,
  ) {}

  count() {
    return this.recipeService.countAll();
  }
  countSubmissionDate(body: GetDashboardMetricsRequestDto) {
    return this.submissionService.countSubmissionDate(body);
  }
  countDeletedSubmissionDate(body: GetDashboardMetricsRequestDto) {
    return this.submissionService.getRecentlyDeletedSubmission(body);
  }
  getNewUserCount(body: GetDashboardMetricsRequestDto) {
    return this.userService.getNewUserCount(body);
  }
}
