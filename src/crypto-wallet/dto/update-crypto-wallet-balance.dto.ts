import { IsPositive } from "class-validator";

export class UpdateCryptoWalletBalanceDto {
  walletId: number;

  @IsPositive()
  reducedBalance: number;
}