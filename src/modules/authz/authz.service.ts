import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthzService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getToken(credentials: any): Promise<any> {
    const tokenRequest = await this.httpService.axiosRef.post(
      `https://${await this.configService.getOrThrow(
        'AUTH0_DOMAIN',
      )}oauth/token`,
      {
        grant_type: 'password',
        client_id: await this.configService.getOrThrow('AUTH0_CLIENT_ID'),
        client_secret: await this.configService.getOrThrow(
          'AUTH0_CLIENT_SECRET',
        ),
        audience: await this.configService.getOrThrow('AUTH0_AUDIENCE'),
        username: credentials.username,
        password: credentials.password,
      },
      {
        headers: { 'content-type': 'application/json' },
      },
    );

    return tokenRequest.data;
  }
}
