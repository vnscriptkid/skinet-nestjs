import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ProductBrand } from './product-brand.entity';
import { ProductType } from './product-type.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Index()
  @Column({
    type: 'decimal',
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return parseFloat(value);
      },
    },
  })
  price: number;

  @Column()
  pictureUrl: string;

  @ManyToOne(() => ProductBrand, (productBrand) => productBrand.products)
  @JoinColumn({ name: 'product_brand_id' })
  brand: ProductBrand;

  @ManyToOne(() => ProductType, (productType) => productType.products)
  @JoinColumn({ name: 'product_type_id' })
  type: ProductType;
}
