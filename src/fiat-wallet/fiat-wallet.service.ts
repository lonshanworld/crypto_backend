import { Injectable } from '@nestjs/common';
import { CreateFiatWalletDto } from './dto/create-fiat-wallet.dto';
import { UpdateFiatWalletDto } from './dto/update-fiat-wallet.dto';

@Injectable()
export class FiatWalletService {
  create(createFiatWalletDto: CreateFiatWalletDto) {
    return 'This action adds a new fiatWallet';
  }

  findAll() {
    return `This action returns all fiatWallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fiatWallet`;
  }

  update(id: number, updateFiatWalletDto: UpdateFiatWalletDto) {
    return `This action updates a #${id} fiatWallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} fiatWallet`;
  }
}
