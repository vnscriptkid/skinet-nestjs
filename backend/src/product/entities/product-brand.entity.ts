import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_brands')
export class ProductBrand extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
