import { PartialType } from '@nestjs/mapped-types';
import { CreateCryptoCurrencyTypeDto } from './create-crypto-currency-type.dto';

export class UpdateCryptoCurrencyTypeDto extends PartialType(CreateCryptoCurrencyTypeDto) {}
