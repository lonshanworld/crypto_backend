// src/trade/order-rate-trade.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { TradeOrder } from './trade-order.entity';
import { CryptoCurrencyType } from 'src/crypto-currency-type/entities/crypto-currency-type.entity';
import { FiatCurrencyType } from 'src/fiat-currency-type/entities/fiat-currency-type.entity';
import { TradeTransaction } from 'src/transactions/entities/trade-transaction.entity';
import { OneToMany } from 'typeorm';

@Entity('order_rate_trade') // Table name if you prefer snake_case
export class OrderRateTrade {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => TradeOrder, (order) => order.orderRateTrade, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tradeOrderId' }) // The foreign key in this table
  tradeOrder: TradeOrder;

  @Column()
  tradeOrderId: number; // Foreign key column

  @ManyToOne(() => CryptoCurrencyType, (currency) => currency.orderRateTrades)
  @JoinColumn({ name: 'cryptoCurrencyId' })
  cryptoCurrency: CryptoCurrencyType;

  @Column()
  cryptoCurrencyId: number; // Foreign key column

  @ManyToOne(() => FiatCurrencyType, (currency) => currency.orderRateTrades)
  @JoinColumn({ name: 'fiatCurrencyId' })
  fiatCurrency: FiatCurrencyType;

  @Column()
  fiatCurrencyId: number; // Foreign key column

  @Column('decimal', { precision: 20, scale: 10 })
  pricePerCoin: number;

  @Column('decimal', { precision: 20, scale: 10 })
  totalCryptoAmount: number;

  @Column('decimal', { precision: 20, scale: 10 })
  totalFiatAmount: number;

  @Column('decimal', { precision: 20, scale: 10 })
  remainingCryptoAmount: number;

  @Column('decimal', { precision: 20, scale: 10 })
  remainingFiatAmount: number;

  // One-to-Many with TradeTransaction (transactions using this rate)
  @OneToMany(() => TradeTransaction, (transaction) => transaction.rate)
  transactions: TradeTransaction[];
}