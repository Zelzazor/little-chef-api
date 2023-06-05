import { Module } from '@nestjs/common';
import { ExperienceModule } from '../experience/experience.module';
import { AuthzModule } from './../authz/authz.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [AuthzModule, ExperienceModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
