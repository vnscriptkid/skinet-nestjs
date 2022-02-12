import { HttpException } from '@nestjs/common';
export class ValidationError extends HttpException {
  constructor(errors: string[]) {
    super(
      {
        errors,
        statusCode: 422,
        message: 'Validation errors',
      },
      422,
    );
  }
}
