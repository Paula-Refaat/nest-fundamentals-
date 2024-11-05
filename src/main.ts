import { WrapDataInterceptor } from './common/interceptors/wrap-interceptor/wrap-data.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';
import { CustomFilter } from './common/filters/custom.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalInterceptors(
    new WrapDataInterceptor(),
    new TimeoutInterceptor(),
  );

  app.useGlobalFilters(new CustomFilter());

  await app.listen(3000);
}
bootstrap();
