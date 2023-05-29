import { Module } from '@nestjs/common';
import { AuthzModule } from '../authz/authz.module';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports: [AuthzModule],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
