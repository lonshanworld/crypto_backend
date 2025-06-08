import { IsNotEmpty } from "class-validator";

export class CreateFiatWalletDto {
    @IsNotEmpty()
    fiatCurrencyId: number;

    @IsNotEmpty()
    balance: number;

    @IsNotEmpty()
    lockedBalance: number;
}
