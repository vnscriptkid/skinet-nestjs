import { Expose, Transform } from 'class-transformer';

export class ProductDto {
  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  pictureUrl: string;

  @Transform(({ obj }) => obj.brand.name)
  @Expose()
  brandName: string;

  @Transform(({ obj }) => obj.type.name)
  @Expose()
  typeName: string;
}
