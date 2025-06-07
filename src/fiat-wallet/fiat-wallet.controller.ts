import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FiatWalletService } from './fiat-wallet.service';
import { CreateFiatWalletDto } from './dto/create-fiat-wallet.dto';
import { UpdateFiatWalletDto } from './dto/update-fiat-wallet.dto';

@Controller('fiat-wallet')
export class FiatWalletController {
  constructor(private readonly fiatWalletService: FiatWalletService) {}

  @Post()
  create(@Body() createFiatWalletDto: CreateFiatWalletDto) {
    return this.fiatWalletService.create(createFiatWalletDto);
  }

  @Get()
  findAll() {
    return this.fiatWalletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fiatWalletService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFiatWalletDto: UpdateFiatWalletDto) {
    return this.fiatWalletService.update(+id, updateFiatWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fiatWalletService.remove(+id);
  }
}
