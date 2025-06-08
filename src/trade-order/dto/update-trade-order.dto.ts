import { PartialType } from '@nestjs/mapped-types';
import { CreateTradeOrderDto } from './create-trade-order.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateTradeAmountDto {
    @IsNotEmpty()
    orderId: number;

    @IsNotEmpty()
    cryptoAmount : number;

    @IsNotEmpty()
    fiatAmount : number;
}
