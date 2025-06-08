import { Module } from '@nestjs/common';
import { TradeOrderService } from './trade-order.service';
import { TradeOrderController } from './trade-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeOrder } from './entities/trade-order.entity';
import { OrderRateTrade } from './entities/order-rate-trade.entity';
import { CryptoWallet } from 'src/crypto-wallet/entities/crypto-wallet.entity';
import { FiatWallet } from 'src/fiat-wallet/entities/fiat-wallet.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      TradeOrder,
      OrderRateTrade,
      CryptoWallet,
      FiatWallet,
    ])
  ],
  controllers: [TradeOrderController],
  providers: [TradeOrderService],
  exports: [TradeOrderService,],
})
export class TradeOrderModule {}
