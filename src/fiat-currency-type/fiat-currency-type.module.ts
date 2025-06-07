import { Module } from '@nestjs/common';
import { FiatCurrencyTypeService } from './fiat-currency-type.service';
import { FiatCurrencyTypeController } from './fiat-currency-type.controller';

@Module({
  controllers: [FiatCurrencyTypeController],
  providers: [FiatCurrencyTypeService],
})
export class FiatCurrencyTypeModule {}
