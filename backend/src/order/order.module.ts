import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { BasketModule } from 'src/basket/basket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DeliveryMethod } from './entities/delivery-method.entity';
import { OrderItem } from './entities/order-item.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    BasketModule,
    ProductModule,
    TypeOrmModule.forFeature([Order, DeliveryMethod, OrderItem]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
