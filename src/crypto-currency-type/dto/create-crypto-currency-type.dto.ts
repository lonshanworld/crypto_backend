import { IsNotEmpty } from "class-validator";

export class CreateCryptoCurrencyTypeDto {
    @IsNotEmpty(
        {message : 'Name cannot be empty'}
    )
    name: string; // Name of the cryptocurrency
    
    @IsNotEmpty(
        {message : 'Symbol cannot be empty'}
    )
    symbol: string; // Symbol of the cryptocurrency (e.g., BTC, ETH)
    
    @IsNotEmpty(
        {message : 'Code cannot be empty'}
    )
    code: string; // Unique code for the cryptocurrency (e.g., BTC, ETH, USDT)
}
