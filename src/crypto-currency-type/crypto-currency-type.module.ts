import { Module } from '@nestjs/common';
import { CryptoCurrencyTypeService } from './crypto-currency-type.service';
import { CryptoCurrencyTypeController } from './crypto-currency-type.controller';

@Module({
  controllers: [CryptoCurrencyTypeController],
  providers: [CryptoCurrencyTypeService],
})
export class CryptoCurrencyTypeModule {}
