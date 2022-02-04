import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductBrand } from './product-brand.entity';
import { ProductType } from './product-type.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ name: 'picture_url' })
  pictureUrl: string;

  @ManyToOne(() => ProductBrand, (productBrand) => productBrand.products)
  @JoinColumn({ name: 'product_brand_id' })
  brand: ProductBrand;

  @ManyToOne(() => ProductType, (productType) => productType.products)
  @JoinColumn({ name: 'product_type_id' })
  type: ProductType;
}