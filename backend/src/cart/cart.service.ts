import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getCart(userId: number): Promise<CartItem[]> {
    return this.cartRepository.find({
      where: { userId },
      relations: ['product'],
      order: { id: 'ASC' },
    });
  }

  async addToCart(userId: number, productId: number, quantity: number): Promise<CartItem> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    const existing = await this.cartRepository.findOne({ where: { userId, productId } });
    if (existing) {
      existing.quantity += quantity;
      return this.cartRepository.save(existing);
    }

    const item = this.cartRepository.create({ userId, productId, quantity });
    return this.cartRepository.save(item);
  }

  async removeFromCart(userId: number, productId: number): Promise<void> {
    await this.cartRepository.delete({ userId, productId });
  }

  async clearCart(userId: number): Promise<void> {
    await this.cartRepository.delete({ userId });
  }
}

