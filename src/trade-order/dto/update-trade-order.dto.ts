import { PartialType } from '@nestjs/mapped-types';
import { CreateTradeOrderDto } from './create-trade-order.dto';

export class UpdateTradeOrderDto extends PartialType(CreateTradeOrderDto) {}
