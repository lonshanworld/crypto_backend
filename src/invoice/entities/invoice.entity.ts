// src/invoice/invoice.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  } from 'typeorm';
  import { User } from 'src/user/entities/user.entity';
import { TradeTransaction } from 'src/transactions/entities/trade-transaction.entity';
import { ExchangeTransaction } from 'src/transactions/entities/exchange-transaction.entity';
import { FiatCurrencyType } from 'src/fiat-currency-type/entities/fiat-currency-type.entity';
import { CryptoCurrencyType } from 'src/crypto-currency-type/entities/crypto-currency-type.entity';
import { InvoiceType } from 'src/common/enums';

  @Entity()
  export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.invoices)
    @JoinColumn({ name: 'userId' })
    user: User;
  
    @Column()
    userId: number; // Foreign key column
  
    @Column({ type: 'enum', enum: InvoiceType })
    invoiceType: InvoiceType; // Renamed 'type' to 'invoiceType' for clarity
  
    // Conditional relationships - only one should be populated based on invoiceType
    @ManyToOne(() => ExchangeTransaction, { nullable: true })
    @JoinColumn({ name: 'exchangeTransactionId' })
    exchangeTransaction: ExchangeTransaction;
  
    @Column({ nullable: true })
    exchangeTransactionId: number; // Foreign key column
  
    @ManyToOne(() => TradeTransaction, { nullable: true })
    @JoinColumn({ name: 'tradeTransactionId' })
    tradeTransaction: TradeTransaction;
  
    @Column({ nullable: true })
    tradeTransactionId: number; // Foreign key column
  
    @Column('decimal', { precision: 20, scale: 10 })
    totalAmount: number; // Added from schema
  
    @ManyToOne(() => CryptoCurrencyType, { nullable: true })
    @JoinColumn({ name: 'cryptoCurrencyId' })
    cryptoCurrency: CryptoCurrencyType;
  
    @Column({ nullable: true })
    cryptoCurrencyId: number; // Foreign key column
  
    @ManyToOne(() => FiatCurrencyType, { nullable: true })
    @JoinColumn({ name: 'fiatCurrencyId' })
    fiatCurrency: FiatCurrencyType;
  
    @Column({ nullable: true })
    fiatCurrencyId: number; // Foreign key column
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date; // Added from schema and corrected to be CreateDateColumn
  }