import { ProductBrand } from './entities/product-brand.entity';
import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { Repository } from 'typeorm';
import { ProductType } from './entities/product-type.entity';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productRepository: ProductRepository,
    @InjectRepository(ProductBrand)
    private readonly productBrandRepository: Repository<ProductBrand>,
    @InjectRepository(ProductType)
    private readonly productTypeRepository: Repository<ProductType>,
  ) {}

  @Get()
  getAllProducts() {
    return this.productRepository.getProducts();
  }

  @Get('brands')
  getProductBrands() {
    return this.productBrandRepository.find();
  }

  @Get('types')
  getProductTypes() {
    return this.productTypeRepository.find();
  }

  @Get(':id')
  getOneProduct(@Param('id') id: number) {
    return this.productRepository.getProductById(id);
  }
}
