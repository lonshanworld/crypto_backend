import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeTransaction } from './entities/trade-transaction.entity';
import { ExchangeTransaction } from './entities/exchange-transaction.entity';
import { TradeOrder } from 'src/trade-order/entities/trade-order.entity';
import { ExchangeOrder } from 'src/exchange-order/entities/exchange-order.entity';
import { CryptoWallet } from 'src/crypto-wallet/entities/crypto-wallet.entity';
import { FiatWallet } from 'src/fiat-wallet/entities/fiat-wallet.entity';
import { TradeOrderService } from 'src/trade-order/trade-order.service';
import { InvoiceService } from 'src/invoice/invoice.service';
import { ExchangeOrderService } from 'src/exchange-order/exchange-order.service';
import { OrderRateTrade } from 'src/trade-order/entities/order-rate-trade.entity';
import { OrderRateExchange } from 'src/exchange-order/entities/order-rate-exchange.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      TradeTransaction,
      ExchangeTransaction,
      TradeOrder,
      ExchangeOrder,
      CryptoWallet,
      FiatWallet,
      OrderRateTrade,
      OrderRateExchange,
      Invoice
    ])
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TradeOrderService,InvoiceService,ExchangeOrderService],
  exports : [TransactionsService]
})
export class TransactionsModule {}
