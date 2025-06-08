import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ExchangeOrderService } from './exchange-order.service';
import { CreateExchangeOrderDto } from './dto/create-exchange-order.dto';
import { UpdateExchangeOrderDto } from './dto/update-exchange-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@Controller('exchange-order')
export class ExchangeOrderController {
  constructor(private readonly exchangeOrderService: ExchangeOrderService) {}

  @Post()
  create(@Req() req : any,@Body() createExchangeOrderDto: CreateExchangeOrderDto) {
    const userId = req.user.id;
    return this.exchangeOrderService.create(userId,createExchangeOrderDto);
  }

  @Get('findAllByUser')
  findAll(@Req() req : any) {
    return this.exchangeOrderService.findAllByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exchangeOrderService.findOne(+id);
  }

}
