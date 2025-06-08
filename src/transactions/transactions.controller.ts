import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTradeTransactionDto } from './dto/create-trade-transaction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateExchangeTransactionDto } from './dto/create-exchange-transaction.dto';
import { ApiBearerAuth } from '@nestjs/swagger';


@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('trade')
  createTrade(@Req() req : any,@Body() createTransactionDto: CreateTradeTransactionDto) {
    return this.transactionsService.createTradeTransaction(req.user.id,createTransactionDto);
  }

  @Post('exchange')
  createExchange(@Req() req : any,@Body() createTransactionDto: CreateExchangeTransactionDto) {
    return this.transactionsService.createExchangeTransaction(req.user.id,createTransactionDto);
  }

  @Get('getByUser')
  findAll(@Req() req : any) {
    return this.transactionsService.findAllByUserId(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }


}
