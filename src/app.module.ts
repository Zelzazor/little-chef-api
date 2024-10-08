import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthzModule } from './modules/authz/authz.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { RecipesModule } from './modules/recipes/recipes.module';
import { S3UploadModule } from './modules/s3-upload/s3-upload.module';
import { SubmissionModule } from './modules/submission/submission.module';
import { TagsModule } from './modules/tags/tags.module';
import { UserModule } from './modules/user/user.module';
import { VoteModule } from './modules/vote/vote.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthzModule,
    UserModule,
    RecipesModule,
    SubmissionModule,
    IngredientModule,
    VoteModule,
    S3UploadModule,
    TagsModule,
    DashboardModule,
    ExperienceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
