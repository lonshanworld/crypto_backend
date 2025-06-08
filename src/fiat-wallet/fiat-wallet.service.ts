import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFiatWalletDto } from './dto/create-fiat-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FiatWallet } from './entities/fiat-wallet.entity';
import { Repository } from 'typeorm';
import { UpdateFiatWalletBalanceDto } from './dto/update-fiat-wallet.dto';

@Injectable()
export class FiatWalletService {
  constructor(
    @InjectRepository(FiatWallet)
    private fiatWalletRepository: Repository<FiatWallet>,
  ) {}

  async create(userId : number,createFiatWalletDto: CreateFiatWalletDto) {
    try{
      const newWallet = {
        userId: userId,
        ...createFiatWalletDto,
      };

      const data = this.fiatWalletRepository.create(newWallet);
      const newData = await this.fiatWalletRepository.save(data);
      return newData;
    }catch(err){
      throw new InternalServerErrorException(`Failed to create fiat wallet: ${err.message}`);
    }
  }

  findAllByUserId(userId: number) {
    return this.fiatWalletRepository.find({
      where : {userId : userId},
    })
  }

  async findByWalletNumber(walletNumber: string) {
    try{
      const wallet = await this.fiatWalletRepository.findOne({
        where: { walletNumber: walletNumber }
      });
      if (!wallet) {
        throw new BadRequestException(`Fiat wallet with wallet number "${walletNumber}" not found.`);
      }
      return wallet;
    }catch(err){
      throw new BadRequestException(`Failed to find fiat wallet by wallet number: ${err.message}`);
    }
  }

  finalByWalletId(walletId: number) {
    try{
      const wallet = this.fiatWalletRepository.findOne({ where: { id: walletId } });
      if (!wallet) {
        throw new BadRequestException(`Fiat wallet with ID "${walletId}" not found.`); 
      }
      return wallet;  
    }catch(err){
      throw new BadRequestException(`Failed to find fiat wallet by ID: ${err.message}`);
    }
  }

  async updateFiatWalletBalance(updateData: UpdateFiatWalletBalanceDto) {
    try{
      const newData = await this.fiatWalletRepository.decrement(
        { id: updateData.walletId },
        'balance',
        updateData.reducedBalance
      );

      return this.finalByWalletId(updateData.walletId);
    }catch(err){
      throw new BadRequestException(`Failed to update fiat wallet balance: ${err.message}`);
    }
  }


}
