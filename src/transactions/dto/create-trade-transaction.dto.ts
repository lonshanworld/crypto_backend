import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTradeTransactionDto {
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    tradeOrderId: number; // Foreign key to TradeOrder

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    tradedCryptoAmount: number; // Amount of crypto being traded

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    tradedFiatAmount: number; // Amount of fiat being traded

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    usedCryptoWalletId: number; // Foreign key to CryptoWallet

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    usedFiatWalletId: number; // Foreign key to FiatWallet
}
