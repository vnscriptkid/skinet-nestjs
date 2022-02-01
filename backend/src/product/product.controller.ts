import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Controller('products')
export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  @Get()
  getAll() {
    console.log('hello');
    return this.productRepository.getProducts();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.productRepository.getProductById(id);
  }
}
