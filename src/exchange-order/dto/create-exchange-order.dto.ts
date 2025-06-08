import { IsNotEmpty } from "class-validator";

export class CreateExchangeOrderDto {
    @IsNotEmpty()
    primaryCryptoWalletId: number; // Foreign key to CryptoWallet for the "from" wallet

    @IsNotEmpty()
    secondaryCryptoWalletId: number; // Foreign key to CryptoWallet for the "to" wallet

    @IsNotEmpty()
    exchangeRate: number; // The rate at which the exchange occurs

    @IsNotEmpty()
    totalPrimaryCryptoAmount: number; // Total amount of primary cryptocurrency to exchange

    @IsNotEmpty()
    totalSecondaryCryptoAmount: number; // Total amount of secondary cryptocurrency to receive

    @IsNotEmpty()
    remainingPrimaryCryptoAmount: number; // Remaining amount of primary cryptocurrency after some exchanges

    @IsNotEmpty()
    remainingSecondaryCryptoAmount: number; // Remaining amount of secondary cryptocurrency after some exchanges
    // Additional fields can be added as needed, such as user ID or other metadata
}
