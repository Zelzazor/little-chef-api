import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Environment } from '../enums/environment.enum';
import { EnvironmentGuard } from './environment.guard';

export const ENVIRONMENT_KEY = 'environments';

export function EnvironmentIs(...environments: Environment[]) {
  return applyDecorators(
    SetMetadata(ENVIRONMENT_KEY, environments),
    UseGuards(EnvironmentGuard),
  );
}
