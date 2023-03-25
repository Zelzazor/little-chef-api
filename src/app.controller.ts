import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Example of how to use the AmazonS3FileInterceptor
  // @Post('upload')
  // @Auth(Role.Admin)
  // @UseInterceptors(AmazonS3FileInterceptor('file', { randomFilename: true }))
  // upload(@UploadedFile() file: Express.Multer.File) {
  //   return file;
  // }
}
