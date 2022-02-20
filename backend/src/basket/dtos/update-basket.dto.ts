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
import { BasketItemDto } from './basket-item.dto';

export class UpdateBasketDto {
  @IsString()
  id: string;

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => BasketItemDto)
  @IsOptional()
  items: BasketItemDto[];
}
