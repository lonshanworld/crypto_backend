import { IsNotEmpty } from "class-validator";

export class CreateCryptoWalletDto {

    @IsNotEmpty()
    cryptoCurrencyId : number;

    @IsNotEmpty()
    balance : number;

    @IsNotEmpty()
    lockedBalance : number;
}
