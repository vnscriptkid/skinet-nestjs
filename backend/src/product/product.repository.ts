import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { ListProductsDto } from './dtos/list-products.dto';
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
  getProducts(criteria?: ListProductsDto): Promise<Product[]> {
    const opts: FindManyOptions<Product> = {};

    if (criteria) {
      // todo: sort by multiple fields
      opts.order = { [criteria.orderBy]: criteria.direction };

      opts.where = {};

      if (criteria.brandId) {
        Object.assign(opts.where, {
          brand: criteria.brandId,
        });
      }

      if (criteria.typeId) {
        Object.assign(opts.where, {
          type: criteria.typeId,
        });
      }
    }

    return this.find({ relations: ['type', 'brand'], ...opts });
  }
}
