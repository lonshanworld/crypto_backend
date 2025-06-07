// src/fiat-wallet/fiat-wallet.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
  } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { FiatCurrencyType } from 'src/fiat-currency-type/entities/fiat-currency-type.entity';

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
  
    @Column('text')
    walletNumber: string; // Added from schema
  
    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date; // Added from schema
  
    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date; // Added from schema
  }