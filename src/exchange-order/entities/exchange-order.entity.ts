// src/exchange/exchange-order.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { OrderStatus } from 'src/common/enums';
import { OrderRateExchange } from './order-rate-exchange.entity';
import { ExchangeTransaction } from 'src/transactions/entities/exchange-transaction.entity';

  @Entity('exchange_order') // Table name if you prefer snake_case
  export class ExchangeOrder {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.exchangeOrders)
    @JoinColumn({ name: 'createdBy' })
    createdBy: User;
  
    @Column()
    createdById: number; // Foreign key column
  
    @Column({ type: 'enum', enum: OrderStatus })
    status: OrderStatus;
  
    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date; // Added from schema
  
    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date; // Added from schema
  
    // --- Relationships ---
    // One-to-One with OrderRateExchange (details of the exchange)
    @OneToOne(() => OrderRateExchange, (orderRate) => orderRate.exchangeOrder, {
      cascade: true,
      onDelete: 'CASCADE',
    })
    orderRateExchange: OrderRateExchange;
  
    // One-to-Many with ExchangeTransaction (transactions stemming from this order)
    @OneToMany(() => ExchangeTransaction, (transaction) => transaction.order)
    transactions: ExchangeTransaction[];
  }