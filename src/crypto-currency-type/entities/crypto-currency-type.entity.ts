// src/currency/crypto-currency-type.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CryptoWallet } from 'src/crypto-wallet/entities/crypto-wallet.entity';
import { OrderRateTrade } from 'src/trade-order/entities/order-rate-trade.entity';
import { OrderRateExchange } from 'src/exchange-order/entities/order-rate-exchange.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Entity('crypto_currency_type') // Table name if you prefer snake_case
export class CryptoCurrencyType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string; // Added from schema

  @Column({ length: 10 })
  symbol: string; // Added from schema

  @Column({ length: 10, unique: true }) // Code should be unique
  code: string;

  // --- Relationships (One-to-Many) ---
  @OneToMany(() => CryptoWallet, (wallet) => wallet.cryptoCurrencyType)
  cryptoWallets: CryptoWallet[];

  @OneToMany(() => OrderRateTrade, (rate) => rate.cryptoCurrency)
  orderRateTrades: OrderRateTrade[];

  @OneToMany(() => OrderRateExchange, (rate) => rate.primaryCryptoCurrency)
  primaryOrderRateExchanges: OrderRateExchange[];

  @OneToMany(() => OrderRateExchange, (rate) => rate.secondaryCryptoCurrency)
  secondaryOrderRateExchanges: OrderRateExchange[];

  @OneToMany(() => Invoice, (invoice) => invoice.cryptoCurrency)
  invoices: Invoice[];
}