// src/currency/fiat-currency-type.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FiatWallet } from 'src/fiat-wallet/entities/fiat-wallet.entity';
import { OrderRateTrade } from 'src/trade-order/entities/order-rate-trade.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Entity('fiat_currency_type') 
export class FiatCurrencyType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string; // Added from schema

  @Column({ length: 10 })
  symbol: string; // Added from schema

  @Column({ length: 150 })
  country: string; // Added from schema

  @Column({ length: 10, unique: true }) // Code should be unique
  code: string;

  // --- Relationships (One-to-Many) ---
  @OneToMany(() => FiatWallet, (wallet) => wallet.fiatCurrencyType)
  fiatWallets: FiatWallet[];

  @OneToMany(() => OrderRateTrade, (rate) => rate.fiatCurrency)
  orderRateTrades: OrderRateTrade[];

  @OneToMany(() => Invoice, (invoice) => invoice.fiatCurrency)
  invoices: Invoice[];
}