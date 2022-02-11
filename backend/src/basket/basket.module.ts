import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: 'localhost',
        port: 6380,
        ttl: 120,
      }),
    }),
  ],
  providers: [BasketService],
  controllers: [BasketController],
})
export class BasketModule {}
