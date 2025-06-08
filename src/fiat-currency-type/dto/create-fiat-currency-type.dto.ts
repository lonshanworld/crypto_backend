import { IsNotEmpty } from "class-validator";

export class CreateFiatCurrencyTypeDto {
   

    @IsNotEmpty({ message: 'Name cannot be empty' })
    name: string; 

    @IsNotEmpty({ message: 'Symbol cannot be empty' })
    symbol: string; 

    @IsNotEmpty({ message: 'Code cannot be empty' })
    code: string; 

    @IsNotEmpty({ message: 'Country cannot be empty' })
    country: string; 
}
