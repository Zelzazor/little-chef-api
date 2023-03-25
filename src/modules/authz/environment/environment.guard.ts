import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Environment } from '../enums/environment.enum';
import { ENVIRONMENT_KEY } from './environment.decorator';

@Injectable()
export class EnvironmentGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const requiredEnvironments = this.reflector.getAllAndOverride<
      Environment[]
    >(ENVIRONMENT_KEY, [context.getHandler(), context.getClass()]);

    const environment = this.configService.get('NODE_ENV');
    if (
      !requiredEnvironments ||
      requiredEnvironments.length === 0 ||
      !requiredEnvironments.some((role) => environment === role)
    ) {
      const req = context.switchToHttp().getRequest();
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: `Cannot ${req.method} ${req.path}`,
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return true;
  }
}
