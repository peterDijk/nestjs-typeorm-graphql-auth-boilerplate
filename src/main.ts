import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import config from '../config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const port = config.PORT || 4000;
  await app.listen(port, () => logger.log(`Server listening on port ${port}`));
}
bootstrap();
