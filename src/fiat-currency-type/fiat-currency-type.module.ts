import { Module } from '@nestjs/common';
import { FiatCurrencyTypeService } from './fiat-currency-type.service';
import { FiatCurrencyTypeController } from './fiat-currency-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiatCurrencyType } from './entities/fiat-currency-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FiatCurrencyType])
  ],
  controllers: [FiatCurrencyTypeController],
  providers: [FiatCurrencyTypeService],
  exports : [FiatCurrencyTypeService]
})
export class FiatCurrencyTypeModule {}
