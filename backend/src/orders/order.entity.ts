import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user_id' })
  userId!: number;

  // Store total price in cents
  @Column({ name: 'total_price', type: 'int' })
  totalPrice!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}

