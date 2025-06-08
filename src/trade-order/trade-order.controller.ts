import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TradeOrderService } from './trade-order.service';
import { CreateTradeOrderDto } from './dto/create-trade-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@Controller('trade-order')
export class TradeOrderController {
  constructor(private readonly tradeOrderService: TradeOrderService) {}

  @Post()
  create(@Req() req : any,@Body() createTradeOrderDto: CreateTradeOrderDto) {
    return this.tradeOrderService.create(req.user.id,createTradeOrderDto);
  }

  @Get('findAllByUser')
  findAll(@Req() req: any) {
    return this.tradeOrderService.findAllByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradeOrderService.findOne(+id);
  }


}
