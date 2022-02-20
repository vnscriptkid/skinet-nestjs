import { Expose, Transform, Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';
export class OrderDto {
  @Expose()
  buyerEmail: string;

  @Expose()
  orderDate: Date;

  @Expose()
  subTotal: number;

  @Expose()
  total: number;

  @Expose()
  status: string;

  @Expose()
  shipToFirstName: string;

  @Expose()
  shipToLastName: string;

  @Expose()
  shipToStreet: string;

  @Expose()
  shipToCity: string;

  @Expose()
  shipToState: string;

  @Expose()
  shipToZipCode: string;

  @Expose()
  @Transform(({ obj }) => obj.deliveryMethod.shortName)
  deliveryMethod: string;

  @Expose()
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];

  @Expose()
  @Transform(({ obj }) => obj.deliveryMethod.price)
  shippingPrice: number;
}
