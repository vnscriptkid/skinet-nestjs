import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { AuthGuardJwt } from 'src/auth/guards/auth-local.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { User } from 'src/user/entities/user.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderDto } from './dtos/order.dto';
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

  @Serialize(OrderDto)
  @Get()
  async getOrdersForUser(@CurrentUser() currentUser: User) {
    const email = currentUser.email;

    const orders = this.orderService.getOrdersForUser(email);

    return orders;
  }

  /* Put this above getOrder */
  @Get('deliveryMethods')
  async getDeliveryMethods() {
    return this.orderService.getDeliveryMethods();
  }

  @Serialize(OrderDto)
  @Get(':id')
  async getOrder(@Param('id') id: number, @CurrentUser() currentUser: User) {
    const order = await this.orderService.getOrderByIdAndThrow(
      id,
      currentUser.email,
    );

    return order;
  }
}
