import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_types')
export class ProductType extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.type)
  products: Product[];
}
