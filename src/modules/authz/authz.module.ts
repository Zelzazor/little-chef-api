import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthzController } from './authz.controller';
import { AuthzService } from './authz.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
    HttpModule,
  ],
  providers: [JwtStrategy, AuthzService],
  exports: [PassportModule],
  controllers: [AuthzController],
})
export class AuthzModule {}
