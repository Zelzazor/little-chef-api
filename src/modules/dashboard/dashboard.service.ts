import { Injectable } from '@nestjs/common';
import { RecipesService } from '../recipes/recipes.service';
import { SubmissionService } from '../submission/submission.service';
import { UserService } from '../user/user.service';

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
  countSubmissionDate() {
    return this.submissionService.countSubmissionDate();
  }
  countDeletedSubmissionDate() {
    return this.submissionService.getRecentlyDeletedSubmission();
  }
  getNewUserCount() {
    return this.userService.getNewUserCount();
  }
}
