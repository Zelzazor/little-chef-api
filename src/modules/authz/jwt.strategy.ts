import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Request } from 'express';

interface JwtPayload {
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService, private prismaService: PrismaService, private httpService: HttpService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get('AUTH0_ISSUER_URL')}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: `${configService.get('AUTH0_AUDIENCE')}`,
      issuer: `${configService.get('AUTH0_ISSUER_URL')}`,
      passReqToCallback: true,
      algorithms: ['RS256'],
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<JwtPayload> {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const user = await this.prismaService.user.findFirst({
      where: {
        subject: payload.sub
      }
    })
    if (!user) {
      const { data } = await lastValueFrom(this.httpService.get(`${this.configService.get('AUTH0_ISSUER_URL')}userinfo`, config))
      const roleUser = await this.prismaService.role.findFirstOrThrow({
        where: {
          name: 'User'
        }
      })
      await this.prismaService.user.create({
        data: {
          subject: payload.sub,
          email: data.email,
          roleId: roleUser.id
        }
      })
    }

    return payload;
  }
}
