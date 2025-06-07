import { PartialType } from '@nestjs/mapped-types';
import { CreateFiatCurrencyTypeDto } from './create-fiat-currency-type.dto';

export class UpdateFiatCurrencyTypeDto extends PartialType(CreateFiatCurrencyTypeDto) {}
