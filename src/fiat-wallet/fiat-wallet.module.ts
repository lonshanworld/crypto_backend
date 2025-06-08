import { Module } from '@nestjs/common';
import { FiatWalletService } from './fiat-wallet.service';
import { FiatWalletController } from './fiat-wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiatWallet } from './entities/fiat-wallet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FiatWallet]),
  ],
  controllers: [FiatWalletController],
  providers: [FiatWalletService],
  exports: [FiatWalletService], // Exporting the service and the TypeOrmModule for use in other modules
})
export class FiatWalletModule {}
