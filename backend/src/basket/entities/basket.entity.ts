import { BasketItem } from './basket-item.entity';

export class Basket {
  id: string; // uuid, generated by client

  items: BasketItem[];

  constructor(id: string) {
    this.id = id;
    this.items = [];
  }
}