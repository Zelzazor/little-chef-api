import { AuthzModule } from './../authz/authz.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [AuthzModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
