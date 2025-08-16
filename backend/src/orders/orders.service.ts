import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CartItem } from '../cart/cart-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(CartItem)
    private readonly cartRepository: Repository<CartItem>,
  ) {}

  async createOrderFromCart(userId: number): Promise<Order> {
    const items = await this.cartRepository.find({ where: { userId }, relations: ['product'] });
    const totalPrice = items.reduce((sum, i) => sum + i.quantity * i.product.price, 0);
    const order = this.orderRepository.create({ userId, totalPrice });
    const saved = await this.orderRepository.save(order);
    await this.cartRepository.delete({ userId });
    return saved;
  }

  async listOrders(userId: number): Promise<Order[]> {
    return this.orderRepository.find({ where: { userId }, order: { id: 'DESC' } });
  }
}

