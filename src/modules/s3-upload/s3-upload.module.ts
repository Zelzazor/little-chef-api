import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterExtendedModule } from 'nestjs-multer-extended';
import { ErrorLogger } from './error.logger';

@Module({
  imports: [
    MulterExtendedModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        awsConfig: {
          accessKeyId: config.get('AWS_ACCESS_KEY_ID') ?? '',
          secretAccessKey: config.get('AWS_SECRET_ACCESS_KEY') ?? '',
          region: config.get('AWS_REGION') ?? '',
        },
        bucket: config.get('AWS_S3_BUCKET_NAME') ?? '',
        basePath: 'public',
        logger: new ErrorLogger(),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MulterExtendedModule],
})
export class S3UploadModule {}
