import { Module } from '@nestjs/common';
import { AuthzModule } from '../authz/authz.module';
import { S3UploadModule } from '../s3-upload/s3-upload.module';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
  imports: [AuthzModule, S3UploadModule],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [RecipesService],
})
export class RecipesModule {}
