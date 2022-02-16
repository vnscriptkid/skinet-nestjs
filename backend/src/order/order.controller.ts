import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { AuthGuardJwt } from 'src/auth/guards/auth-local.guard';
import { User } from 'src/user/entities/user.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderService } from './order.service';

@UseGuards(AuthGuardJwt)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: User,
  ) {
    const order = await this.orderService.createOrder(
      user.email,
      createOrderDto.deliveryMethod,
      createOrderDto.basketId,
      createOrderDto.shipToAddress,
    );

    return order;
  }
}
