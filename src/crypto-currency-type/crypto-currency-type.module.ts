import { Module } from '@nestjs/common';
import { CryptoCurrencyTypeService } from './crypto-currency-type.service';
import { CryptoCurrencyTypeController } from './crypto-currency-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoCurrencyType } from './entities/crypto-currency-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CryptoCurrencyType]),
    
  ],
  controllers: [CryptoCurrencyTypeController],
  providers: [CryptoCurrencyTypeService],
  exports : [CryptoCurrencyTypeService], // Exporting the service and the TypeOrmModule for use in other modules
})
export class CryptoCurrencyTypeModule {}
