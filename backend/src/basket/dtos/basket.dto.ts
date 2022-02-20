import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { BasketItemDto } from './basket-item.dto';

export class BasketDto {
  id: string;

  @Type(() => BasketItemDto)
  items: BasketItemDto[];

  deliveryMethodId?: string;

  clientSecret: string;

  paymentIntentId: string;
}
