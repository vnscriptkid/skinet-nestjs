import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ProductBrand } from './entities/product-brand.entity';
import {
  CacheInterceptor,
  CacheModule,
  CACHE_MANAGER,
  Module,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from './entities/product-type.entity';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    // CacheModule.register<RedisClientOptions>({
    //   store: redisStore,
    //   socket: {
    //     host: 'localhost',
    //     port: 6388,
    //   },
    // }),
    CacheModule.registerAsync({
      // imports: [ConfigModule],
      // inject: [ConfigService],
      useFactory: (/*configService: ConfigService*/) => ({
        store: redisStore,
        // host: configService.get('REDIS_HOST'),
        // port: configService.get('REDIS_PORT'),
        host: 'localhost',
        port: 6380,
        ttl: 120,
      }),
    }),
    TypeOrmModule.forFeature([
      ProductRepository,
      ProductType,
      ProductBrand,
      Product,
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    /* TODO: fix, this will apply cache for all endpoints */
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
  exports: [ProductService],
})
export class ProductModule {}
