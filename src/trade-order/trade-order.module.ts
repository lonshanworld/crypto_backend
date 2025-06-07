import { Module } from '@nestjs/common';
import { TradeOrderService } from './trade-order.service';
import { TradeOrderController } from './trade-order.controller';

@Module({
  controllers: [TradeOrderController],
  providers: [TradeOrderService],
})
export class TradeOrderModule {}
