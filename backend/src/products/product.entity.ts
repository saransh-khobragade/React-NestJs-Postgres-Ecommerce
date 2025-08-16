import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  // Store price in smallest currency unit (e.g., cents)
  @Column({ type: 'int' })
  price!: number;

  @Column({ name: 'image_url', length: 1024 })
  imageUrl!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}

