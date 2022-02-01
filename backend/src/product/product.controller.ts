import { Controller, Get, Param } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Controller('products')
export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  @Get()
  getAll() {
    return this.productRepository.getProducts();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.productRepository.getProductById(id);
  }
}
