import { ProductBrand } from './entities/product-brand.entity';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { Repository } from 'typeorm';
import { ProductType } from './entities/product-type.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ProductDto } from './dtos/product.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ListProductsDto } from './dtos/list-products.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly productRepository: ProductRepository,
    @InjectRepository(ProductBrand)
    private readonly productBrandRepository: Repository<ProductBrand>,
    @InjectRepository(ProductType)
    private readonly productTypeRepository: Repository<ProductType>,
  ) {}

  @Serialize(ProductDto)
  @Get()
  async getAllProducts(@Query() criteria: ListProductsDto) {
    const products = await this.productRepository.getProducts(criteria);

    return products;
  }

  @Get('brands')
  getProductBrands() {
    return this.productBrandRepository.find();
  }

  @Get('types')
  getProductTypes() {
    return this.productTypeRepository.find();
  }

  @Serialize(ProductDto)
  @Get(':id')
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiOkResponse({ type: ProductDto })
  async getOneProduct(@Param('id') id: number) {
    const product = await this.productRepository.getProductById(id);

    if (!product) throw new NotFoundException();

    return product;
  }
}
