import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CryptoCurrencyTypeService } from './crypto-currency-type.service';
import { CreateCryptoCurrencyTypeDto } from './dto/create-crypto-currency-type.dto';
import { UpdateCryptoCurrencyTypeDto } from './dto/update-crypto-currency-type.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('crypto-currency-type')
export class CryptoCurrencyTypeController {
  constructor(private readonly cryptoCurrencyTypeService: CryptoCurrencyTypeService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post()
  create(@Body() createCryptoCurrencyTypeDto: CreateCryptoCurrencyTypeDto) {
    return this.cryptoCurrencyTypeService.create(createCryptoCurrencyTypeDto);
  }

  @Get()
  findAll() {
    return this.cryptoCurrencyTypeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cryptoCurrencyTypeService.findOne(+id);
  }
}
