import { Expose, Transform } from 'class-transformer';

export class OrderItemDto {
  @Expose()
  @Transform(({ obj }) => obj.productItemId)
  productId: number;

  @Expose()
  productName: string;

  @Expose()
  @Transform(({ obj }) => `${process.env.API_URL}/${obj.pictureUrl}`)
  pictureUrl: string;

  @Expose()
  price: number;

  @Expose()
  quantity: number;
}
