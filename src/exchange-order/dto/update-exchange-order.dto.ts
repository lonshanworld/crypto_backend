import { PartialType } from '@nestjs/mapped-types';
import { CreateExchangeOrderDto } from './create-exchange-order.dto';

export class UpdateExchangeOrderDto extends PartialType(CreateExchangeOrderDto) {}
