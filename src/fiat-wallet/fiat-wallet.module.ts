import { Module } from '@nestjs/common';
import { FiatWalletService } from './fiat-wallet.service';
import { FiatWalletController } from './fiat-wallet.controller';

@Module({
  controllers: [FiatWalletController],
  providers: [FiatWalletService],
})
export class FiatWalletModule {}
