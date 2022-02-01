import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  @Get()
  getAll() {
    console.log('hello');
    return this.productRepository.find();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.productRepository.findOne(id);
  }
}
