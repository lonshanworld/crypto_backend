// src/crypto-wallet/crypto-wallet.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    BeforeInsert,
    OneToMany,
  } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CryptoCurrencyType } from 'src/crypto-currency-type/entities/crypto-currency-type.entity';
import { v4 as uuidv4 } from 'uuid'; 
import { TradeOrder } from 'src/trade-order/entities/trade-order.entity';
import { ExchangeOrder } from 'src/exchange-order/entities/exchange-order.entity';
import { TradeTransaction } from 'src/transactions/entities/trade-transaction.entity';
import { ExchangeTransaction } from 'src/transactions/entities/exchange-transaction.entity';
  @Entity()
  export class CryptoWallet {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.cryptoWallets, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
  
    @Column()
    userId: number; // Foreign key column
  
    @ManyToOne(() => CryptoCurrencyType, (currency) => currency.cryptoWallets)
    @JoinColumn({ name: 'cryptoCurrencyId' }) // Assuming 'cryptoCurrencyId' in schema maps to cryptoCurrencyId
    cryptoCurrencyType: CryptoCurrencyType;
  
    @Column()
    cryptoCurrencyId: number; // Foreign key column
  
    @Column('decimal', { precision: 20, scale: 10, default: 0 })
    balance: number;
  
    @Column('decimal', { precision: 20, scale: 10, default: 0 })
    lockedBalance: number; // Added from schema
  
    @Column('varchar', {length : 255,unique: true, nullable: false })
    walletNumber: string; // Added from schema
  
    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date; // Added from schema
  
    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date; // Added from schema

    @OneToMany(() => TradeOrder, tradeOrder => tradeOrder.cryptoWallet)
  tradeOrders: TradeOrder[];

  @OneToMany(() => ExchangeOrder, exchangeOrder => exchangeOrder.primaryCryptoWallet)
  primaryExchangeOrders: ExchangeOrder[];

  @OneToMany(() => ExchangeOrder, exchangeOrder => exchangeOrder.secondaryCryptoWallet)
  secondaryExchangeOrders: ExchangeOrder[];

  @OneToMany(() => TradeTransaction, tradeTransaction => tradeTransaction.usedCryptoWallet)
  tradeTransactionsAsUsedCrypto: TradeTransaction[];

  @OneToMany(() => ExchangeTransaction, exchangeTransaction => exchangeTransaction.usedPrimaryCryptoWallet)
  exchangeTransactionsAsUsedPrimary: ExchangeTransaction[];

  @OneToMany(() => ExchangeTransaction, exchangeTransaction => exchangeTransaction.usedSecondaryCryptoWallet)
  exchangeTransactionsAsUsedSecondary: ExchangeTransaction[];

    @BeforeInsert()
    generateWalletNumber() {
      if (!this.walletNumber) {
        // Generate a UUID v4 and remove hyphens
        this.walletNumber = uuidv4().replace(/-/g, '');
      }
    }

  }