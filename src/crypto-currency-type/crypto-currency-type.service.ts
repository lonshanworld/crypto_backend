import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCryptoCurrencyTypeDto } from './dto/create-crypto-currency-type.dto';
import { UpdateCryptoCurrencyTypeDto } from './dto/update-crypto-currency-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoCurrencyType } from './entities/crypto-currency-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CryptoCurrencyTypeService {

  constructor(
    @InjectRepository(CryptoCurrencyType)
    private cryptoCurrencyTypeRepository: Repository<CryptoCurrencyType>,
  ){}

  create(createCryptoCurrencyTypeDto: CreateCryptoCurrencyTypeDto) : Promise<CryptoCurrencyType> {
    try{

      return this.cryptoCurrencyTypeRepository.save(createCryptoCurrencyTypeDto);
    }catch(err){
      throw new BadRequestException('Error creating crypto currency type');
    }
  }

  findAll() : Promise<CryptoCurrencyType[]> {
    return this.cryptoCurrencyTypeRepository.find();
  }

  async findOne(id: number) : Promise<CryptoCurrencyType> {
    const currency = await this.cryptoCurrencyTypeRepository.findOne({ where: { id } });
  
    if (!currency) {
      throw new NotFoundException(`CryptoCurrencyType with ID "${id}" not found.`);
    }
    return currency;
  }
}
