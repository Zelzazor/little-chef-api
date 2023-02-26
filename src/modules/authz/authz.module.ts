import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), ConfigModule, HttpModule],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class AuthzModule {}
