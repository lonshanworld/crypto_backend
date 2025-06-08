// src/exchange/exchange-transaction.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  } from 'typeorm';
  import { ExchangeOrder } from 'src/exchange-order/entities/exchange-order.entity';
  import { OrderRateExchange } from 'src/exchange-order/entities/order-rate-exchange.entity';
  import { User } from 'src/user/entities/user.entity';
  import { TransactionStatus } from 'src/common/enums';
import { CryptoWallet } from 'src/crypto-wallet/entities/crypto-wallet.entity';
  
  @Entity('exchange_transactions')
  export class ExchangeTransaction {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    ownerId: number; // The user initiating the exchange
  
    @Column()
    receiverId: number; // The user receiving the exchanged crypto
  
    @Column()
    rateId: number; // The specific rate used from OrderRateExchange table

    @Column()
  orderId: number; // The ExchangeOrder this transaction is associated with
  
    @Column({ type: 'decimal', precision: 20, scale: 10 })
    tradedPrimaryCryptoAmount: number;
  
    @Column({ type: 'decimal', precision: 20, scale: 10 })
    tradedSecondaryCryptoAmount: number;
  
    @Column()
    usedPrimaryCryptoWalletId: number;
  
    @Column()
    usedSecondaryCryptoWalletId: number;
  
    @Column({ type: 'enum', enum: TransactionStatus, default : TransactionStatus.COMPLETED })
    status: TransactionStatus;
  
    @CreateDateColumn({ type: 'timestamp'})
    tradeTime: Date; // Corresponds to 'createdAt' for a transaction record
  
    @Column({ type: 'timestamp', nullable: true })
    cryptoReleaseTime: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    completedTime: Date;
  
    // --- Relationships ---
    @ManyToOne(() => User, user => user.ownedExchangeTransactions)
    @JoinColumn({ name: 'ownerId' })
    owner: User;
  
    @ManyToOne(() => User, user => user.receivedExchangeTransactions)
    @JoinColumn({ name: 'receiverId' })
    receiver: User;

    @ManyToOne(() => ExchangeOrder, exchangeOrder => exchangeOrder.id)
      @JoinColumn({ name: 'orderId' })
      order: ExchangeOrder;
    
  
    @ManyToOne(() => OrderRateExchange, orderRateExchange => orderRateExchange.transactions)
    @JoinColumn({ name: 'rateId' })
    rate: OrderRateExchange; // Assuming OrderRateExchange entity exists
  
    @ManyToOne(() => CryptoWallet, cryptoWallet => cryptoWallet.exchangeTransactionsAsUsedPrimary)
    @JoinColumn({ name: 'usedPrimaryCryptoWalletId' })
    usedPrimaryCryptoWallet: CryptoWallet;
  
    @ManyToOne(() => CryptoWallet, cryptoWallet => cryptoWallet.exchangeTransactionsAsUsedSecondary)
    @JoinColumn({ name: 'usedSecondaryCryptoWalletId' })
    usedSecondaryCryptoWallet: CryptoWallet;
  }