import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class ProductDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  price: number;

  @ApiProperty()
  @Transform(({ obj }) => `${process.env.API_URL}/${obj.pictureUrl}`)
  @Expose()
  pictureUrl: string;

  @ApiProperty()
  @Transform(({ obj }) => obj.brand.name)
  @Expose()
  brandName: string;

  @ApiProperty()
  @Transform(({ obj }) => obj.type.name)
  @Expose()
  typeName: string;
}
