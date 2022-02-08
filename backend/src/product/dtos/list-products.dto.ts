import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

enum OrderProduct {
  id = 'id',
  price = 'price',
  name = 'name',
}

enum OrderDirection {
  desc = 'DESC',
  asc = 'ASC',
}

export class PaginationParams {
  static MAX_PAGE_SIZE = 50;
  static DEFAULT_PAGE_SIZE = 5;

  @IsOptional()
  @IsNumber()
  @Min(1)
  pageIndex: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ obj }) =>
    Math.min(PaginationParams.MAX_PAGE_SIZE, obj.pageSize),
  )
  pageSize: number = PaginationParams.DEFAULT_PAGE_SIZE;
}

export class ListProductsDto extends PaginationParams {
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

  @IsOptional()
  @IsString()
  @Transform(({ obj }) => obj.search.toLowerCase())
  search: string;
}
