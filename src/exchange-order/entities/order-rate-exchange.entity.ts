// src/exchange/order-rate-exchange.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { ExchangeOrder } from './exchange-order.entity';
import { CryptoCurrencyType } from 'src/crypto-currency-type/entities/crypto-currency-type.entity';
import { ExchangeTransaction } from 'src/transactions/entities/exchange-transaction.entity';
import { OneToMany } from 'typeorm';

@Entity('order_rate_exchange') // Table name if you prefer snake_case
export class OrderRateExchange {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ExchangeOrder, (order) => order.orderRateExchange, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'exchangeOrderId' }) // The foreign key in this table
  exchangeOrder: ExchangeOrder;

  @Column()
  exchangeOrderId: number; // Foreign key column

  @ManyToOne(() => CryptoCurrencyType, (currency) => currency.primaryOrderRateExchanges)
  @JoinColumn({ name: 'primaryCryptoCurrencyId' })
  primaryCryptoCurrency: CryptoCurrencyType;

  @Column()
  primaryCryptoCurrencyId: number; // Foreign key column

  @ManyToOne(() => CryptoCurrencyType, (currency) => currency.secondaryOrderRateExchanges)
  @JoinColumn({ name: 'secondaryCryptoCurrencyId' })
  secondaryCryptoCurrency: CryptoCurrencyType;

  @Column()
  secondaryCryptoCurrencyId: number; // Foreign key column

  @Column('decimal', { precision: 20, scale: 10 })
  exchangeRate: number;

  @Column('decimal', { precision: 20, scale: 10 })
  totalPrimaryCryptoAmount: number;

  @Column('decimal', { precision: 20, scale: 10 })
  totalSecondaryCryptoAmount: number;

  @Column('decimal', { precision: 20, scale: 10 })
  remainingPrimaryCryptoAmount: number;

  @Column('decimal', { precision: 20, scale: 10 })
  remainingSecondaryCryptoAmount: number;

  // One-to-Many with ExchangeTransaction (transactions using this rate)
  @OneToMany(() => ExchangeTransaction, (transaction) => transaction.rate)
  transactions: ExchangeTransaction[];
}