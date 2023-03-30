import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

// class UploadBodyDTO {
//   @IsOptional()
//   @IsString()
//   name: string;

//   @IsOptional()
//   @IsString()
//   description: string;
// }

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('upload')
  // @Auth(Role.Admin)
  // @UseInterceptors(
  //   AmazonS3FileInterceptor('file', { randomFilename: true }),
  //   ParseDataInterceptor,
  // )
  // upload(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() body: UploadBodyDTO,
  // ) {
  //   console.log(body);
  //   return file;
  // }
}
