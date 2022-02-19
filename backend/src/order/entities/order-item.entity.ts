import { BaseEntity } from 'src/common/base.entity';
import { AfterLoad, Column, Entity, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity('order_items')
export class OrderItem extends BaseEntity {
  @Column()
  productItemId: number;

  @Column()
  productName: string;

  @Column()
  pictureUrl: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  }) // if deletes order, related orderItems get deleted as well.
  order: Order;

  @AfterLoad() _convertNumerics() {
    this.price = parseFloat(this.price as any);
  }
}
