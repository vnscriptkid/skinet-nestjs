import { Expose, Transform } from 'class-transformer';

export class ProductDto {
  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Transform(({ obj }) => `${process.env.API_URL}/${obj.pictureUrl}`)
  @Expose()
  pictureUrl: string;

  @Transform(({ obj }) => obj.brand.name)
  @Expose()
  brandName: string;

  @Transform(({ obj }) => obj.type.name)
  @Expose()
  typeName: string;
}
