import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty, isNil, keyBy } from 'lodash';
import { BasketService } from 'src/basket/basket.service';
import { DeliveryMethod } from 'src/order/entities/delivery-method.entity';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { StripeService } from './stripe.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly basketService: BasketService,
    @InjectRepository(DeliveryMethod)
    private readonly deliveryMethodRepository: Repository<DeliveryMethod>,
    private readonly productService: ProductService,
    private readonly stripeService: StripeService,
  ) {}

  async createOrUpdatePaymentIntent(basketId: string) {
    const basket = await this.basketService.getBasketThrow(basketId);

    let shippingPrice = 0;

    if (!isNil(basket.deliveryMethodId)) {
      const deliveryMethod = await this.deliveryMethodRepository.findOneOrFail(
        basket.deliveryMethodId,
      );

      shippingPrice += deliveryMethod.price;
    }

    const ids = basket.items.map((x) => x.id);
    const products = await this.productService.findByIdsThrow(ids);
    const productsKeyedByIds = keyBy(products, 'id');

    for (let item of basket.items) {
      const correctPrice = productsKeyedByIds[item.id].price;
      if (item.price !== correctPrice) item.price = correctPrice;
    }

    if (isEmpty(basket.paymentIntentId)) {
      const intent = await this.stripeService.createPaymentIntent({
        amount:
          basket.items.reduce((p, c) => p + c.price * 100 * c.quantity, 0) +
          shippingPrice,
        currency: 'usd',
        payment_method_types: ['card'],
      });

      basket.paymentIntentId = intent.id;
      basket.clientSecret = intent.client_secret;
    } else {
      await this.stripeService.updatePaymentIntent(basket.paymentIntentId, {
        amount:
          basket.items.reduce((p, c) => p + c.price * 100 * c.quantity, 0) +
          shippingPrice,
      });
    }

    await this.basketService.updateBasket(basket);

    return basket;
  }
}
