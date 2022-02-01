import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductController {
  @Get()
  getAll() {
    return 'all products';
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return 'get one product';
  }
}
