// src/crypto-wallet/crypto-wallet.entity.ts
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
import { CryptoCurrencyType } from 'src/crypto-currency-type/entities/crypto-currency-type.entity';

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
  
    @Column('text')
    walletNumber: string; // Added from schema
  
    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date; // Added from schema
  
    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date; // Added from schema
  }