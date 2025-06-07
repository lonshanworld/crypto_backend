import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TradeOrderService } from './trade-order.service';
import { CreateTradeOrderDto } from './dto/create-trade-order.dto';
import { UpdateTradeOrderDto } from './dto/update-trade-order.dto';

@Controller('trade-order')
export class TradeOrderController {
  constructor(private readonly tradeOrderService: TradeOrderService) {}

  @Post()
  create(@Body() createTradeOrderDto: CreateTradeOrderDto) {
    return this.tradeOrderService.create(createTradeOrderDto);
  }

  @Get()
  findAll() {
    return this.tradeOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradeOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTradeOrderDto: UpdateTradeOrderDto) {
    return this.tradeOrderService.update(+id, updateTradeOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tradeOrderService.remove(+id);
  }
}
