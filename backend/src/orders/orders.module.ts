import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { CartItem } from '../cart/cart-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, CartItem])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

