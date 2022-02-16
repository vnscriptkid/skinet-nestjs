import { Type } from 'class-transformer';
import { IsDefined, IsNumber, IsString, ValidateNested } from 'class-validator';
import { ShippingAddress } from '../entities/order.entity';

export class ShipToAddressDto implements ShippingAddress {
  @IsString()
  shipToFirstName: string;

  @IsString()
  shipToLastName: string;

  @IsString()
  shipToStreet: string;

  @IsString()
  shipToCity: string;

  @IsString()
  shipToState: string;

  @IsString()
  shipToZipCode: string;
}

export class CreateOrderDto {
  @IsString()
  basketId: string;

  @IsNumber()
  deliveryMethod: number;

  @IsDefined()
  @ValidateNested()
  @Type(() => ShipToAddressDto)
  shipToAddress: ShipToAddressDto;
}
