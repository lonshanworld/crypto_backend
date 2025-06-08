import { Module } from '@nestjs/common';
import { CryptoWalletService } from './crypto-wallet.service';
import { CryptoWalletController } from './crypto-wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoWallet } from './entities/crypto-wallet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CryptoWallet]),
  ],
  controllers: [CryptoWalletController],
  providers: [CryptoWalletService],
  exports: [CryptoWalletService], // Exporting the service and the TypeOrmModule for use in other modules
})
export class CryptoWalletModule {}
