import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ProductBrand } from './product/entities/product-brand.entity';
import { ProductType } from './product/entities/product-type.entity';
import { Product } from './product/entities/product.entity';
import products from './seed/products.json';
import brands from './seed/brands.json';
import types from './seed/types.json';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly conn: Connection) {}

  async onApplicationBootstrap() {
    const productRepo = this.conn.getRepository(Product);
    const productBrandRepo = this.conn.getRepository(ProductBrand);
    const productTypeRepo = this.conn.getRepository(ProductType);

    try {
      if ((await productBrandRepo.count()) === 0) {
        console.log(`seending brands...`);
        await productBrandRepo.insert(brands as any);
      }

      if ((await productTypeRepo.count()) === 0) {
        console.log(`seeding types...`);
        await productTypeRepo.insert(types as any);
      }
      if ((await productRepo.count()) === 0) {
        console.log(`seeding products...`);
        await productRepo.insert(products as any);
      }
    } catch (e) {
      console.log(`err while seeding.`, e);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
