import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  const logger = new Logger('main-app');
  await app.listen(3000, ()=> {
    logger.debug(`server running at ${3000}`);
  });
}
bootstrap();
