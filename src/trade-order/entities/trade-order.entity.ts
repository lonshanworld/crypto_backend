// src/trade/trade-order.entity.ts
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
import { OrderStatus,OrderType } from 'src/common/enums';
import { OrderRateTrade } from './order-rate-trade.entity';
import { TradeTransaction } from 'src/transactions/entities/trade-transaction.entity';
import { CryptoWallet } from 'src/crypto-wallet/entities/crypto-wallet.entity';
import { FiatWallet } from 'src/fiat-wallet/entities/fiat-wallet.entity';

  @Entity('trade_order') // Table name if you prefer snake_case
  export class TradeOrder {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.tradeOrders)
    @JoinColumn({ name: 'createdBy' })
    createdBy: User;
  
    @Column()
    createdById: number; // Foreign key column

    @Column()
    cryptoWalletId: number;

    @Column()
    fiatWalletId: number;
  
    @Column({ type: 'enum', enum: OrderType })
    orderType: OrderType; 
  
    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.OPEN })
    status: OrderStatus;
  
    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date; // Added from schema
  
    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date; // Added from schema
  
    // --- Relationships ---
    // One-to-One with OrderRateTrade (details of the trade)
    @OneToOne(() => OrderRateTrade, (orderRate) => orderRate.tradeOrder, {
      cascade: true, // If you create an order, its rate details are also saved
      onDelete: 'CASCADE',
    })
    orderRateTrade: OrderRateTrade;

    @ManyToOne(() => CryptoWallet, cryptoWallet => cryptoWallet.tradeOrders) // Define inverse relationship in CryptoWallet entity
  @JoinColumn({ name: 'cryptoWalletId' })
  cryptoWallet: CryptoWallet;

  @ManyToOne(() => FiatWallet, fiatWallet => fiatWallet.tradeOrders) // Define inverse relationship in FiatWallet entity
  @JoinColumn({ name: 'fiatWalletId' })
  fiatWallet: FiatWallet;
    // One-to-Many with TradeTransaction (transactions stemming from this order)
    @OneToMany(() => TradeTransaction, (transaction) => transaction.order)
    transactions: TradeTransaction[];
  }