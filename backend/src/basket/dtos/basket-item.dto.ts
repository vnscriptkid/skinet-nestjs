import { IsNumber, IsString, Min } from 'class-validator';

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
