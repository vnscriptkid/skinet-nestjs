import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  findByIds(ids: number[]) {
    return this.productRepository.findByIds(ids);
  }

  async findByIdsThrow(ids: number[]) {
    const products = await this.findByIds(ids);

    if (ids.length !== products.length) throw new NotFoundException();

    return products;
  }
}
