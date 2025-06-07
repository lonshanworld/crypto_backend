import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { FiatCurrencyTypeModule } from './fiat-currency-type/fiat-currency-type.module';
import { CryptoCurrencyTypeModule } from './crypto-currency-type/crypto-currency-type.module';
import { FiatWalletModule } from './fiat-wallet/fiat-wallet.module';
import { CryptoWalletModule } from './crypto-wallet/crypto-wallet.module';
import { TradeOrderModule } from './trade-order/trade-order.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ExchangeOrderModule } from './exchange-order/exchange-order.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available globally
      envFilePath: '.env', // Specify your .env file path
    }),
    DatabaseModule, UserModule, AuthModule, FiatCurrencyTypeModule, CryptoCurrencyTypeModule, FiatWalletModule, CryptoWalletModule, TradeOrderModule, TransactionsModule, ExchangeOrderModule, InvoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
