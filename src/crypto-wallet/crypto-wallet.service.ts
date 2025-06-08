import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCryptoWalletDto } from './dto/create-crypto-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoWallet } from './entities/crypto-wallet.entity';
import { Repository } from 'typeorm';
import { UpdateCryptoWalletBalanceDto } from './dto/update-crypto-wallet-balance.dto';

@Injectable()
export class CryptoWalletService {
  constructor(
    @InjectRepository(CryptoWallet)
    private cryptoWalletRepository: Repository<CryptoWallet>,
  ) {}
  async create(userId : number,createCryptoWalletDto: CreateCryptoWalletDto) : Promise<CryptoWallet> {
    try{

      const newCryptoWallet = {
        userId: userId,
        ...createCryptoWalletDto,
      }
      const data =  this.cryptoWalletRepository.create(newCryptoWallet); 
      const newData = await this.cryptoWalletRepository.save(data);
      return newData; 
    }catch(err){

      throw new InternalServerErrorException(`Failed to create crypto wallet: ${err.message}`);
    }
  }

  findAllByUserId(userId : number): Promise<CryptoWallet[]> {
    return this.cryptoWalletRepository.find({ where: { userId } });
  }

  findByWalletNumber(walletNumber: string) {
    return this.cryptoWalletRepository.findOne({ where: { walletNumber } });
  }

  async findByWalletId(walletId: number) : Promise<CryptoWallet> {
    try{
      const wallet = await this.cryptoWalletRepository.findOne({ where: { id: walletId } });
      if (!wallet) {
        throw new BadRequestException(`Crypto wallet with ID "${walletId}" not found.`);
      }
      return wallet;
    }catch(err){
      throw new BadRequestException(`Failed to find crypto wallet by ID: ${err.message}`);
    }
  }

  async updateCryptoWalletBalance(updateData : UpdateCryptoWalletBalanceDto) : Promise<CryptoWallet>{
    try{
      const newData = await this.cryptoWalletRepository.decrement(
        {id : updateData.walletId},
        'balance',
        updateData.reducedBalance
      );

      return this.findByWalletId(updateData.walletId);

    }catch(err){
      throw new BadRequestException(`Failed to update crypto wallet balance: ${err.message}`);
    }
  }

  
}
