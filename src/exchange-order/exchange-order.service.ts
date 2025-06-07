import { Injectable } from '@nestjs/common';
import { CreateExchangeOrderDto } from './dto/create-exchange-order.dto';
import { UpdateExchangeOrderDto } from './dto/update-exchange-order.dto';

@Injectable()
export class ExchangeOrderService {
  create(createExchangeOrderDto: CreateExchangeOrderDto) {
    return 'This action adds a new exchangeOrder';
  }

  findAll() {
    return `This action returns all exchangeOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exchangeOrder`;
  }

  update(id: number, updateExchangeOrderDto: UpdateExchangeOrderDto) {
    return `This action updates a #${id} exchangeOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} exchangeOrder`;
  }
}
