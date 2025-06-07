import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExchangeOrderService } from './exchange-order.service';
import { CreateExchangeOrderDto } from './dto/create-exchange-order.dto';
import { UpdateExchangeOrderDto } from './dto/update-exchange-order.dto';

@Controller('exchange-order')
export class ExchangeOrderController {
  constructor(private readonly exchangeOrderService: ExchangeOrderService) {}

  @Post()
  create(@Body() createExchangeOrderDto: CreateExchangeOrderDto) {
    return this.exchangeOrderService.create(createExchangeOrderDto);
  }

  @Get()
  findAll() {
    return this.exchangeOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exchangeOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExchangeOrderDto: UpdateExchangeOrderDto) {
    return this.exchangeOrderService.update(+id, updateExchangeOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exchangeOrderService.remove(+id);
  }
}
