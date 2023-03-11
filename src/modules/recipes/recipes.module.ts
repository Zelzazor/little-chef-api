import { Module } from '@nestjs/common';
import { AuthzModule } from '../authz/authz.module';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
  imports: [AuthzModule],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
