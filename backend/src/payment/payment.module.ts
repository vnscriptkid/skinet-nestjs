import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketModule } from 'src/basket/basket.module';
import { DeliveryMethod } from 'src/order/entities/delivery-method.entity';
import { ProductModule } from 'src/product/product.module';
import { PaymentService } from './payment.service';
import { StripeService } from './stripe.service';
import { PaymentController } from './payment.controller';

@Module({
  imports: [
    BasketModule,
    TypeOrmModule.forFeature([DeliveryMethod]),
    ProductModule,
  ],
  providers: [PaymentService, StripeService],
  controllers: [PaymentController],
})
export class PaymentModule {}
