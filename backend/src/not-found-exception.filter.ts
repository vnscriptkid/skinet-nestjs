import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import express from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse() as express.Response;

    response.status(404).json({
      statusCode: 404,
      message: 'Not found.',
    });
  }
}
