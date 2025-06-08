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
import { CryptoWallet } from 'src/crypto-wallet/entities/crypto-wallet.entity';
import { FiatWallet } from 'src/fiat-wallet/entities/fiat-wallet.entity';

@Entity('trade_transactions')
export class TradeTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sellerId: number;

  @Column()
  buyerId: number;

  @Column()
  orderId: number; // The TradeOrder this transaction is associated with

  @Column()
  rateId: number; // The specific rate used from OrderRateTrade table

  @Column({ type: 'decimal', precision: 20, scale: 10 })
  tradedCryptoAmount: number;

  @Column({ type: 'decimal', precision: 20, scale: 10 })
  tradedFiatAmount: number;

  @Column()
  usedCryptoWalletId: number;

  @Column()
  usedFiatWalletId: number;

  @Column({ type: 'enum', enum: TransactionStatus, default : TransactionStatus.COMPLETED })
  status: TransactionStatus;

  @CreateDateColumn({ type: 'timestamp' })
  tradeTime: Date; // Corresponds to 'createdAt' for a transaction record

  @Column({ type: 'timestamp', nullable: true }) // Can be null until crypto is released
  cryptoReleaseTime: Date;

  @Column({ type: 'timestamp', nullable: true }) // Can be null until completed
  completedTime: Date;

  // --- Relationships ---
  @ManyToOne(() => User, user => user.soldTradeTransactions)
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @ManyToOne(() => User, user => user.boughtTradeTransactions)
  @JoinColumn({ name: 'buyerId' })
  buyer: User;

  @ManyToOne(() => TradeOrder, tradeOrder => tradeOrder.id)
  @JoinColumn({ name: 'orderId' })
  order: TradeOrder;

  @ManyToOne(() => OrderRateTrade, orderRateTrade => orderRateTrade.transactions)
  @JoinColumn({ name: 'rateId' })
  rate: OrderRateTrade; // Assuming OrderRateTrade entity exists

  @ManyToOne(() => CryptoWallet, cryptoWallet => cryptoWallet.tradeTransactionsAsUsedCrypto)
  @JoinColumn({ name: 'usedCryptoWalletId' })
  usedCryptoWallet: CryptoWallet;

  @ManyToOne(() => FiatWallet, fiatWallet => fiatWallet.tradeTransactionsAsUsedFiat)
  @JoinColumn({ name: 'usedFiatWalletId' })
  usedFiatWallet: FiatWallet;
}