import { NotFoundExceptionFilter } from './not-found-exception.filter';
import { HttpException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: 'http://localhost:4200' });

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
            errors: findErrors(errors),
            statusCode: 422,
            message: 'Validation errors',
          },
          422,
        );
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

function findErrors(obj: any) {
  const errors: string[] = [];

  function _findErrors(obj: any) {
    if (typeof obj === 'object' && obj !== null) {
      for (let key in obj) {
        if (key === 'constraints') {
          for (let e of Object.values(obj[key])) errors.push(e as string);
        } else {
          _findErrors(obj[key]);
        }
      }
    }

    // number, string, null, undefined, boolean
    return obj;
  }

  _findErrors(obj);

  return errors;
}
