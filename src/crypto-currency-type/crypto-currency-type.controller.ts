import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CryptoCurrencyTypeService } from './crypto-currency-type.service';
import { CreateCryptoCurrencyTypeDto } from './dto/create-crypto-currency-type.dto';
import { UpdateCryptoCurrencyTypeDto } from './dto/update-crypto-currency-type.dto';

@Controller('crypto-currency-type')
export class CryptoCurrencyTypeController {
  constructor(private readonly cryptoCurrencyTypeService: CryptoCurrencyTypeService) {}

  @Post()
  create(@Body() createCryptoCurrencyTypeDto: CreateCryptoCurrencyTypeDto) {
    return this.cryptoCurrencyTypeService.create(createCryptoCurrencyTypeDto);
  }

  @Get()
  findAll() {
    return this.cryptoCurrencyTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cryptoCurrencyTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCryptoCurrencyTypeDto: UpdateCryptoCurrencyTypeDto) {
    return this.cryptoCurrencyTypeService.update(+id, updateCryptoCurrencyTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cryptoCurrencyTypeService.remove(+id);
  }
}
