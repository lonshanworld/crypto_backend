import { Module } from '@nestjs/common';
import { ExchangeOrderService } from './exchange-order.service';
import { ExchangeOrderController } from './exchange-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeOrder } from './entities/exchange-order.entity';
import { OrderRateExchange } from './entities/order-rate-exchange.entity';
import { CryptoWallet } from 'src/crypto-wallet/entities/crypto-wallet.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      ExchangeOrder,
      OrderRateExchange,
      CryptoWallet
    ])
  ],
  controllers: [ExchangeOrderController],
  providers: [ExchangeOrderService],
  exports : [ExchangeOrderService]
})
export class ExchangeOrderModule {}
