import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from 'src/product/dtos/create-product.dto';

@ApiTags('buggy')
@Controller('buggy')
export class BuggyController {
  @Get('notfound')
  notFound() {
    throw new NotFoundException();
  }

  @Get('servererror')
  serverError() {
    const nullVar = null;

    nullVar.run();
  }

  @Get('badrequest')
  badRequest() {
    throw new BadRequestException();
  }

  @Post('validationerrors')
  validationErrors(@Body() body: CreateProductDto) {
    return { success: true };
  }
}
