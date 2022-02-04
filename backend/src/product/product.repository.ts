import { EntityRepository, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

export interface IProductRepository {
  getProductById(id: number): Promise<Product>;
  getProducts(): Promise<Product[]>;
}

@EntityRepository(Product)
export class ProductRepository
  extends Repository<Product>
  implements IProductRepository
{
  getProductById(id: number) {
    return this.findOne(id, {
      relations: ['type', 'brand'],
    });
  }
  getProducts(): Promise<Product[]> {
    return this.find({ relations: ['type', 'brand'] });
  }
}
