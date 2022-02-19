import { Expose, Transform } from 'class-transformer';

export class OrderItemDto {
  @Expose()
  @Transform(({ obj }) => obj.productItemId)
  productId: number;

  @Expose()
  productName: string;

  @Expose()
  pictureUrl: string;

  @Expose()
  price: number;

  @Expose()
  quantity: number;
}
