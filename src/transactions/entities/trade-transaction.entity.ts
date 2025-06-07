// src/trade/trade-transaction.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  } from 'typeorm';
import { TradeOrder } from 'src/trade-order/entities/trade-order.entity';
import { OrderRateTrade } from 'src/trade-order/entities/order-rate-trade.entity';
import { User } from 'src/user/entities/user.entity';
import { TransactionStatus } from 'src/common/enums';

  @Entity('trade_transaction') // Table name if you prefer snake_case
  export class TradeTransaction {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.soldTradeTransactions)
    @JoinColumn({ name: 'sellerId' })
    seller: User;
  
    @Column()
    sellerId: number; // Foreign key column
  
    @ManyToOne(() => User, (user) => user.boughtTradeTransactions)
    @JoinColumn({ name: 'buyerId' })
    buyer: User;
  
    @Column()
    buyerId: number; // Foreign key column
  
    @ManyToOne(() => TradeOrder, (order) => order.transactions)
    @JoinColumn({ name: 'orderId' })
    order: TradeOrder;
  
    @Column()
    orderId: number; // Foreign key column
  
    @ManyToOne(() => OrderRateTrade, (rate) => rate.transactions)
    @JoinColumn({ name: 'rateId' }) // Assuming 'rate' in schema is FK to OrderRateTrade.id
    rate: OrderRateTrade;
  
    @Column()
    rateId: number; // Foreign key column
  
    @Column('decimal', { precision: 20, scale: 10 })
    tradedCryptoAmount: number; // Added from schema
  
    @Column('decimal', { precision: 20, scale: 10 })
    tradedFiatAmount: number; // Added from schema
  
    @Column({ type: 'enum', enum: TransactionStatus })
    status: TransactionStatus;
  
    @CreateDateColumn({ type: 'datetime' }) // Assuming tradeTime is essentially creation time
    tradeTime: Date; // Added from schema
  
    @Column({ type: 'datetime', nullable: true })
    cryptoReleaseTime: Date; // Added from schema
  
    @Column({ type: 'datetime', nullable: true })
    completedTime: Date; // Added from schema
  }