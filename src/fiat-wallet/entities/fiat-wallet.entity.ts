// src/fiat-wallet/fiat-wallet.entity.ts
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
import { FiatCurrencyType } from 'src/fiat-currency-type/entities/fiat-currency-type.entity';
import { v4 as uuidv4 } from 'uuid'; 
import { TradeOrder } from 'src/trade-order/entities/trade-order.entity';
import { TradeTransaction } from 'src/transactions/entities/trade-transaction.entity';
  @Entity()
  export class FiatWallet {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.fiatWallets, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' }) // Explicitly define the foreign key column name
    user: User;
  
    @Column()
    userId: number; // Foreign key column
  
    @ManyToOne(() => FiatCurrencyType, (currency) => currency.fiatWallets)
    @JoinColumn({ name: 'fiatCurrencyId' }) // Assuming 'fiatCurrency_id' in schema maps to fiatCurrencyId
    fiatCurrencyType: FiatCurrencyType;
  
    @Column()
    fiatCurrencyId: number; // Foreign key column
  
    @Column('decimal', { precision: 20, scale: 10, default: 0 })
    balance: number;
  
    @Column('decimal', { precision: 20, scale: 10, default: 0 })
    lockedBalance: number; // Added from schema
  
    @Column('varchar', {length : 255,unique: true, nullable: false })
    walletNumber: string; // Added from schema // Added from schema
  
    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date; // Added from schema
  
    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date; // Added from schema

    @OneToMany(() => TradeOrder, tradeOrder => tradeOrder.fiatWallet)
    tradeOrders: TradeOrder[];

    @OneToMany(() => TradeTransaction, tradeTransaction => tradeTransaction.usedFiatWallet)
  tradeTransactionsAsUsedFiat: TradeTransaction[];

    @BeforeInsert()
    generateWalletNumber() {
      if (!this.walletNumber) {
        this.walletNumber = uuidv4().replace(/-/g, '');
      }
    }
  }