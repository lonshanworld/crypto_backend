import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFiatCurrencyTypeDto } from './dto/create-fiat-currency-type.dto';
import { UpdateFiatCurrencyTypeDto } from './dto/update-fiat-currency-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FiatCurrencyType } from './entities/fiat-currency-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FiatCurrencyTypeService {
  constructor(
    @InjectRepository(FiatCurrencyType)
    private fiatCurrencyTypeRepository: Repository<FiatCurrencyType>,
  ) {}

  create(createFiatCurrencyTypeDto: CreateFiatCurrencyTypeDto) {
    try{
      return this.fiatCurrencyTypeRepository.save(createFiatCurrencyTypeDto);
    }catch(err){
      throw new BadRequestException('Error creating fiat currency type');
    }
  }

  findAll() : Promise<FiatCurrencyType[]> {
    return this.fiatCurrencyTypeRepository.find();
  }

  async findOne(id: number) : Promise<FiatCurrencyType> {
    const currency = await this.fiatCurrencyTypeRepository.findOne({ where: { id } });
    
    if (!currency) {
      throw new BadRequestException(`FiatCurrencyType with ID "${id}" not found.`);
    }
    return currency;
  }

}
