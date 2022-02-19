import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { keyBy } from 'lodash';
import { BasketService } from 'src/basket/basket.service';
import { ProductService } from 'src/product/product.service';
import { Repository, Connection } from 'typeorm';
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
    private readonly connection: Connection,
  ) {}

  async createOrder(
    buyerEmail: string,
    deliveryMethodId: number,
    basketId: string,
    shippingAddress: ShippingAddress,
  ) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const basket = await this.basketService.getBasket(basketId);

    const products = await this.productService.findByIds(
      basket.items.map((x) => x.id),
    );

    const productsByIds = keyBy(products, 'id');

    const orderItemsList: OrderItem[] = [];

    for (let basketItem of basket.items) {
      const orderItem = queryRunner.manager.create(OrderItem, {
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

    const order = queryRunner.manager.create(Order, {
      buyerEmail,
      ...shippingAddress,
      deliveryMethod,
      subTotal,
    });

    order.orderItems = orderItemsList;

    try {
      const newOrder = await queryRunner.manager.save(order);

      await queryRunner.commitTransaction();

      return newOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException(`Failed to create new order.`);
    } finally {
      await queryRunner.release();
    }
  }

  async getOrdersForUser(buyerEmail: string) {}

  async getOrderById(id: number, buyerEmail: string) {}

  async getDeliveryMethods() {}
}
