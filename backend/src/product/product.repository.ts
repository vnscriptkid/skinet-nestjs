import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';

export interface IProductRepository {
  getProductById(id: number): Promise<Product>;
  getProducts(): Promise<Product[]>;
}

@EntityRepository(Product)
export class ProductRepository
  extends Repository<Product>
  implements IProductRepository
{
  getProductById(id: number): Promise<Product> {
    return this.findOne(id);
  }
  getProducts(): Promise<Product[]> {
    return this.find();
  }
}
