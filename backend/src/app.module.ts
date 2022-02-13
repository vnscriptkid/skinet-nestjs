import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './product/entities/product.entity';
import { ProductModule } from './product/product.module';
import { BuggyModule } from './buggy/buggy.module';
import { BasketModule } from './basket/basket.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    // CacheModule.register<RedisClientOptions>({
    //   store: redisStore,
    //   socket: {
    //     host: 'localhost',
    //     port: 6380,
    //   },
    // }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ProductModule,
    TypeOrmModule.forRoot({
      entities: [Product],
    }),
    BuggyModule,
    BasketModule,
    UserModule,
    AuthModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
