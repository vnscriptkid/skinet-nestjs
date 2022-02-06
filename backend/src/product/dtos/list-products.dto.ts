import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

enum OrderProduct {
  id = 'id',
  price = 'price',
  name = 'name',
}

enum OrderDirection {
  desc = 'DESC',
  asc = 'ASC',
}

export class ListProductsDto {
  @IsString()
  @IsEnum(OrderProduct)
  orderBy: string = 'id';

  @IsString()
  @Transform(
    ({ obj }) =>
      typeof obj.direction === 'string' && obj.direction.toUpperCase(),
  )
  @IsEnum(OrderDirection)
  direction: 'DESC' | 'ASC' = 'ASC';

  @IsOptional()
  @IsNumber()
  brandId: number;

  @IsOptional()
  @IsNumber()
  typeId: number;
}
