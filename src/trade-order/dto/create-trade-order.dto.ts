import { IsNotEmpty } from "class-validator";
import { OrderType } from "src/common/enums";

export class CreateTradeOrderDto {
    @IsNotEmpty()
    cryptoWalletId: number; // Foreign key to CryptoWallet

    @IsNotEmpty()
    fiatWalletId: number; // Foreign key to FiatWallet

    @IsNotEmpty()
    orderType: OrderType; // Enum for order type (BUY/SELL)

    @IsNotEmpty()
    cryptoCurrencyId: number; // Foreign key to CryptoCurrencyType

    @IsNotEmpty()
    fiatCurrencyId: number; // Foreign key to FiatCurrencyType

    @IsNotEmpty()
    pricePerCoin: number; // Price per coin in fiat currency

    @IsNotEmpty()
    totalCryptoAmount: number; // Total amount of cryptocurrency to trade

    @IsNotEmpty()
    totalFiatAmount: number; // Total amount of fiat currency to trade
}
