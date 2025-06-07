import { Injectable } from '@nestjs/common';
import { CreateTradeOrderDto } from './dto/create-trade-order.dto';
import { UpdateTradeOrderDto } from './dto/update-trade-order.dto';

@Injectable()
export class TradeOrderService {
  create(createTradeOrderDto: CreateTradeOrderDto) {
    return 'This action adds a new tradeOrder';
  }

  findAll() {
    return `This action returns all tradeOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tradeOrder`;
  }

  update(id: number, updateTradeOrderDto: UpdateTradeOrderDto) {
    return `This action updates a #${id} tradeOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} tradeOrder`;
  }
}
