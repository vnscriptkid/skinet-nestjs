import { PaginatedResult } from 'src/common/pagination';
import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { ListProductsDto } from './dtos/list-products.dto';
import { Product } from './entities/product.entity';

export interface IProductRepository {
  getProductById(id: number): Promise<Product>;
  getProducts(): Promise<PaginatedResult<Product>>;
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
  async getProducts(
    criteria?: ListProductsDto,
  ): Promise<PaginatedResult<Product>> {
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

      opts.take = criteria.pageSize;
      opts.skip = (criteria.pageIndex - 1) * criteria.pageSize;
    }

    const [products, count] = await this.findAndCount({
      relations: ['type', 'brand'],
      ...opts,
    });

    return new PaginatedResult(
      products,
      count,
      criteria.pageIndex,
      criteria.pageSize,
    );
  }
}
