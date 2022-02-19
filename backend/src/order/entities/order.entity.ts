import { BaseEntity } from 'src/common/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { DeliveryMethod } from './delivery-method.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from './order-status';

export interface ShippingAddress {
  shipToFirstName: string;

  shipToLastName: string;

  shipToStreet: string;

  shipToCity: string;

  shipToState: string;

  shipToZipCode: string;
}

@Entity('orders')
export class Order extends BaseEntity implements ShippingAddress {
  @Column()
  buyerEmail: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  orderDate: Date;

  @Column({ type: 'decimal' })
  subTotal: number;

  @Column({ type: 'enum', default: OrderStatus.Pending, enum: OrderStatus })
  status: OrderStatus;

  @Column({ nullable: true })
  paymentIntentId: string;

  /* SHIP TO ADDRESS */
  @Column()
  shipToFirstName: string;

  @Column()
  shipToLastName: string;

  @Column()
  shipToStreet: string;

  @Column()
  shipToCity: string;

  @Column()
  shipToState: string;

  @Column()
  shipToZipCode: string;

  /* VIRTUAL FIELDS */
  @ManyToOne(() => DeliveryMethod)
  deliveryMethod: DeliveryMethod;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: ['update', 'insert'],
  })
  orderItems: OrderItem[];

  /* UTILS METHODS */
  get getTotal() {
    return this.subTotal + this.deliveryMethod.price;
  }
}
