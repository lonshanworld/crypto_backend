import { IsNotEmpty } from "class-validator";

export class UpdateExchangeOrderDto {
    @IsNotEmpty()
    exchangeOrderId: number; // ID of the exchange order to update

    @IsNotEmpty()
    primaryCryptoAmount: number; // Amount of primary cryptocurrency to exchange
    
    @IsNotEmpty()
    secondaryCryptoAmount: number; // Amount of secondary cryptocurrency to receive
}
