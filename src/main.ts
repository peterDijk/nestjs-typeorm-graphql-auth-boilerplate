import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import config from '../config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(config.PREFIX);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe());
  // Swagger.io setup
  const documentOptions = new DocumentBuilder()
    .setTitle(config.TITLE)
    .setDescription(config.DESCRIPTION)
    .setVersion(config.VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup(config.API_EXPLORER_PATH, app, document);
  // Swagger.io setup
  const port = config.PORT || 4000;
  await app.listen(port, () => {
    logger.log(`Server listening on port ${port}`);
    logger.log(
      `API Explorer available on port ${config.PORT}${config.API_EXPLORER_PATH}`,
    );
  });
}
bootstrap();
