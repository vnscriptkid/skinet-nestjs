import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { keyBy } from 'lodash';
import { BasketService } from 'src/basket/basket.service';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { DeliveryMethod } from './entities/delivery-method.entity';
import { OrderItem } from './entities/order-item.entity';
import { Order, ShippingAddress } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(DeliveryMethod)
    private readonly deliveryMethodRepository: Repository<DeliveryMethod>,

    private readonly basketService: BasketService,
    private readonly productService: ProductService,
  ) {}

  async createOrder(
    buyerEmail: string,
    deliveryMethodId: number,
    basketId: string,
    shippingAddress: ShippingAddress,
  ) {
    const basket = await this.basketService.getBasket(basketId);

    const products = await this.productService.findByIds(
      basket.items.map((x) => x.id),
    );

    const productsByIds = keyBy(products, 'id');

    const orderItemsList: OrderItem[] = [];

    for (let basketItem of basket.items) {
      const orderItem = this.orderItemRepository.create({
        productItemId: basketItem.id,
        productName: basketItem.productName,
        pictureUrl: basketItem.pictureUrl,
        price: productsByIds[basketItem.id].price,
        quantity: basketItem.quantity,
      });

      orderItemsList.push(orderItem);
    }

    const deliveryMethod = await this.deliveryMethodRepository.findOne(
      deliveryMethodId,
    );

    const subTotal = orderItemsList.reduce(
      (a, i) => a + i.price * i.quantity,
      0,
    );

    const order = this.orderRepository.create({
      buyerEmail,
      ...shippingAddress,
      deliveryMethod,
      subTotal,
    });

    order.orderItems = orderItemsList;

    // TODO: save order

    return order;
  }

  async getOrdersForUser(buyerEmail: string) {}

  async getOrderById(id: number, buyerEmail: string) {}

  async getDeliveryMethods() {}
}
