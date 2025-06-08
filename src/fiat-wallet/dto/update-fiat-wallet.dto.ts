import { IsPositive } from "class-validator";

export class UpdateFiatWalletBalanceDto {
    walletId: number;
    
    @IsPositive()
    reducedBalance: number;
}