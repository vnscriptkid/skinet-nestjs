import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class BasketItemDto {
  @IsNumber()
  id: number;

  @IsString()
  productName: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  pictureUrl: string;

  @IsString()
  brand: string;

  @IsString()
  type: string;
}

export class UpdateBasketDto {
  @IsString()
  id: string;

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => BasketItemDto)
  @IsOptional()
  items: BasketItemDto[];
}
