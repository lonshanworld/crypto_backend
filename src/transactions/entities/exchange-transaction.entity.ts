// src/exchange/exchange-transaction.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  } from 'typeorm';
  import { ExchangeOrder } from 'src/exchange-order/entities/exchange-order.entity';
  import { OrderRateExchange } from 'src/exchange-order/entities/order-rate-exchange.entity';
  import { User } from 'src/user/entities/user.entity';
  import { TransactionStatus } from 'src/common/enums';
  
  @Entity('exchange_transaction') // Table name if you prefer snake_case
  export class ExchangeTransaction {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.ownedExchangeTransactions)
    @JoinColumn({ name: 'ownerId' })
    owner: User;
  
    @Column()
    ownerId: number; // Foreign key column
  
    @ManyToOne(() => User, (user) => user.receivedExchangeTransactions)
    @JoinColumn({ name: 'receiverId' })
    receiver: User;
  
    @Column()
    receiverId: number; // Foreign key column
  
    @ManyToOne(() => ExchangeOrder, (order) => order.transactions)
    @JoinColumn({ name: 'orderId' }) // Assuming 'order' in your code is FK to ExchangeOrder.id
    order: ExchangeOrder;
  
    @Column()
    orderId: number; // Foreign key column
  
    @ManyToOne(() => OrderRateExchange, (rate) => rate.transactions)
    @JoinColumn({ name: 'rateId' }) // Assuming 'rate' in schema is FK to OrderRateExchange.id
    rate: OrderRateExchange;
  
    @Column()
    rateId: number; // Foreign key column
  
    @Column('decimal', { precision: 20, scale: 10 })
    tradedPrimaryCryptoAmount: number; // Added from schema
  
    @Column('decimal', { precision: 20, scale: 10 })
    tradedSecondaryCryptoAmount: number; // Added from schema
  
    @Column({ type: 'enum', enum: TransactionStatus })
    status: TransactionStatus;
  
    @CreateDateColumn({ type: 'datetime' }) // Assuming tradeTime is creation time
    tradeTime: Date; // Added from schema
  
    @Column({ type: 'datetime', nullable: true })
    cryptoReleaseTime: Date; // Added from schema
  
    @Column({ type: 'datetime', nullable: true })
    completedTime: Date; // Added from schema
  }