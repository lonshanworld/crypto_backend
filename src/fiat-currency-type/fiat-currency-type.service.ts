import { Injectable } from '@nestjs/common';
import { CreateFiatCurrencyTypeDto } from './dto/create-fiat-currency-type.dto';
import { UpdateFiatCurrencyTypeDto } from './dto/update-fiat-currency-type.dto';

@Injectable()
export class FiatCurrencyTypeService {
  create(createFiatCurrencyTypeDto: CreateFiatCurrencyTypeDto) {
    return 'This action adds a new fiatCurrencyType';
  }

  findAll() {
    return `This action returns all fiatCurrencyType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fiatCurrencyType`;
  }

  update(id: number, updateFiatCurrencyTypeDto: UpdateFiatCurrencyTypeDto) {
    return `This action updates a #${id} fiatCurrencyType`;
  }

  remove(id: number) {
    return `This action removes a #${id} fiatCurrencyType`;
  }
}
