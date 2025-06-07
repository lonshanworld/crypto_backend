import { Injectable } from '@nestjs/common';
import { CreateCryptoCurrencyTypeDto } from './dto/create-crypto-currency-type.dto';
import { UpdateCryptoCurrencyTypeDto } from './dto/update-crypto-currency-type.dto';

@Injectable()
export class CryptoCurrencyTypeService {
  create(createCryptoCurrencyTypeDto: CreateCryptoCurrencyTypeDto) {
    return 'This action adds a new cryptoCurrencyType';
  }

  findAll() {
    return `This action returns all cryptoCurrencyType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cryptoCurrencyType`;
  }

  update(id: number, updateCryptoCurrencyTypeDto: UpdateCryptoCurrencyTypeDto) {
    return `This action updates a #${id} cryptoCurrencyType`;
  }

  remove(id: number) {
    return `This action removes a #${id} cryptoCurrencyType`;
  }
}
