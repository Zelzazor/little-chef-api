import { Module } from '@nestjs/common';
import { AuthzModule } from '../authz/authz.module';
import { RecipesModule } from '../recipes/recipes.module';
import { SubmissionModule } from '../submission/submission.module';
import { UserModule } from '../user/user.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [RecipesModule, SubmissionModule, AuthzModule, UserModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
