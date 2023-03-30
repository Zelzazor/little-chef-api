import { LoggerService } from '@nestjs/common';

export class ErrorLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log('');
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(message);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn('');
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug('');
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.debug('');
  }
}
