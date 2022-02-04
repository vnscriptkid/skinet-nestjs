import { ProductBrand } from './entities/product-brand.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from './entities/product-type.entity';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository, ProductType, ProductBrand]),
  ],
  controllers: [ProductController],
})
export class ProductModule {}
