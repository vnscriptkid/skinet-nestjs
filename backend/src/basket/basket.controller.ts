import { AuthGuardJwt } from './../auth/guards/auth-local.guard';
import { UpdateBasketDto } from './dtos/update-basket.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BasketService } from './basket.service';

@UseGuards(AuthGuardJwt)
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Get(':id')
  getBasket(@Param('id') id: string) {
    return this.basketService.getBasket(id);
  }

  @Post()
  updateBasket(@Body() updateBasketDto: UpdateBasketDto) {
    this.basketService.updateBasket(updateBasketDto);
  }

  @Delete(':id')
  deleteBasket(@Param('id') id: string) {
    return this.basketService.deleteBasket(id);
  }
}
