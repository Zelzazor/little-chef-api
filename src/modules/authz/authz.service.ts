import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetTokenRequestDTO } from './dto/get-token.request.dto';
import { GetTokenResponseDTO } from './dto/get-token.response.dto';

@Injectable()
export class AuthzService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getToken(
    credentials: GetTokenRequestDTO,
  ): Promise<GetTokenResponseDTO> {
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
        username: credentials.email,
        password: credentials.password,
      },
      {
        headers: { 'content-type': 'application/json' },
      },
    );

    return {
      accessToken: tokenRequest.data.access_token,
      expiresIn: tokenRequest.data.expires_in,
      tokenType: tokenRequest.data.token_type,
    };
  }
}
