import { Module } from '@nestjs/common';
import { ExchangeOrderService } from './exchange-order.service';
import { ExchangeOrderController } from './exchange-order.controller';

@Module({
  controllers: [ExchangeOrderController],
  providers: [ExchangeOrderService],
})
export class ExchangeOrderModule {}
