import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateExchangeTransactionDto {
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    exchangeOrderId : number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    tradedPrimaryCryptoAmount : number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    tradedSecondaryCryptoAmount : number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    primaryWalletId : number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    secondaryWalletId : number;
}

