import { NotFoundExceptionFilter } from './not-found-exception.filter';
import {
  BadRequestException,
  HttpException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new NotFoundExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true, // filter out fields outside of dto
      exceptionFactory: (errors: ValidationError[]) => {
        return new HttpException(
          {
            errors: errors
              .map((e) => Object.values(e.constraints))
              .reduce((a, i) => [...a, ...i], []),
            statusCode: 422,
            message: 'Validation errors',
          },
          422,
        );
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
