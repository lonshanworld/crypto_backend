// src/user/user.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
import { KycStatus } from 'src/common/enums';
import { FiatWallet } from 'src/fiat-wallet/entities/fiat-wallet.entity';
  import { CryptoWallet } from 'src/crypto-wallet/entities/crypto-wallet.entity';
  import { TradeOrder } from 'src/trade-order/entities/trade-order.entity';
  import { ExchangeOrder } from 'src/exchange-order/entities/exchange-order.entity';
  import { TradeTransaction } from 'src/transactions/entities/trade-transaction.entity';
  import { ExchangeTransaction } from 'src/transactions/entities/exchange-transaction.entity';
  import { Invoice } from 'src/invoice/entities/invoice.entity';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    email: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    name: string; // Changed from varchar to nullable as per schema, or provide default
  
    @Column({ type: 'text', nullable: false })
    passwordHash: string;
  
    @Column({
      type: 'enum',
      enum: KycStatus,
      default: KycStatus.PENDING,
      nullable: true, // Assuming default pending means it can be null if not explicitly set
    })
    kycStatus: KycStatus;
  
    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;
  
    // Define relations (will be created in later steps)
    @OneToMany(() => FiatWallet, (wallet) => wallet.user)
    fiatWallets: FiatWallet[];
  
    @OneToMany(() => CryptoWallet, (wallet) => wallet.user)
    cryptoWallets: CryptoWallet[];
  
    @OneToMany(() => TradeOrder, (order) => order.createdBy)
    tradeOrders: TradeOrder[];
  
    @OneToMany(() => ExchangeOrder, (order) => order.createdBy)
    exchangeOrders: ExchangeOrder[];
  
    @OneToMany(() => TradeTransaction, (transaction) => transaction.seller)
    soldTradeTransactions: TradeTransaction[];
  
    @OneToMany(() => TradeTransaction, (transaction) => transaction.buyer)
    boughtTradeTransactions: TradeTransaction[];
  
    @OneToMany(() => ExchangeTransaction, (transaction) => transaction.owner)
    ownedExchangeTransactions: ExchangeTransaction[];
  
    @OneToMany(() => ExchangeTransaction, (transaction) => transaction.receiver)
    receivedExchangeTransactions: ExchangeTransaction[];
  
    @OneToMany(() => Invoice, (invoice) => invoice.user)
    invoices: Invoice[];
  }