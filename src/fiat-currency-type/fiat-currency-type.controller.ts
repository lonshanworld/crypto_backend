// src/fiat-currency-type/fiat-currency-type.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FiatCurrencyTypeService } from './fiat-currency-type.service';
import { CreateFiatCurrencyTypeDto } from './dto/create-fiat-currency-type.dto';
import { UpdateFiatCurrencyTypeDto } from './dto/update-fiat-currency-type.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import the guard
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('fiat-currency-type')
export class FiatCurrencyTypeController {
  constructor(private readonly fiatCurrencyTypeService: FiatCurrencyTypeService) {}

  @UseGuards(JwtAuthGuard) // Protect the create endpoint
  @ApiBearerAuth('JWT-auth')
  @Post()
  create(@Body() createFiatCurrencyTypeDto: CreateFiatCurrencyTypeDto) {
    return this.fiatCurrencyTypeService.create(createFiatCurrencyTypeDto);
  }

  @Get()
  findAll() {
    return this.fiatCurrencyTypeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fiatCurrencyTypeService.findOne(+id);
  }

}