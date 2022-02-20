import { Basket } from './entities/basket.entity';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UpdateBasketDto } from './dtos/update-basket.dto';

@Injectable()
export class BasketService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getBasket(id: string) {
    return await this.cacheManager.get<Basket>(id);
  }

  async getBasketThrow(id: string) {
    const basket = await this.getBasket(id);

    if (!basket) throw new NotFoundException();

    return basket;
  }

  async updateBasket(basket: UpdateBasketDto) {
    await this.cacheManager.set(basket.id, basket, {
      ttl: 1000 * 3600 * 24 * 30,
    }); // ttl: 30days
  }

  deleteBasket(id: string): any {
    return this.cacheManager.del(id);
  }
}
