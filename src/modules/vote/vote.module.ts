import { Module } from '@nestjs/common';
import { RecipesModule } from '../recipes/recipes.module';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';

@Module({
  imports: [RecipesModule],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
