import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('delivery_methods')
export class DeliveryMethod extends BaseEntity {
  @Column()
  shortName: string;

  @Column()
  deliveryTime: string;

  @Column()
  description: string;

  @Column({ type: 'decimal' })
  price: number;
}
