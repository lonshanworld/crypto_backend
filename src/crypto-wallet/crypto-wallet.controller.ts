import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { CryptoWalletService } from './crypto-wallet.service';
import { CreateCryptoWalletDto } from './dto/create-crypto-wallet.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateCryptoWalletBalanceDto } from './dto/update-crypto-wallet-balance.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@Controller('crypto-wallet')
export class CryptoWalletController {
  constructor(private readonly cryptoWalletService: CryptoWalletService) {}

  
  @Post()
  create(@Req() req: any,@Body() createCryptoWalletDto: CreateCryptoWalletDto) {
    const userId = req.user['id'];
    return this.cryptoWalletService.create(userId,createCryptoWalletDto);
  }

  @Get('getAllCryptoWalletByUser')
  findAll(@Req() req: any) {
    const userId = req.user['id'];
    return this.cryptoWalletService.findAllByUserId(userId);
  }

  @Get('findByWalletId/:id')
  findOne(@Param('id') id: string) {
    return this.cryptoWalletService.findByWalletId(+id);
  }

  @Get('findByWalletNumber/:walletNumber')
  findByWalletNumber(@Param('walletNumber') walletNumber: string) {
    return this.cryptoWalletService.findByWalletNumber(walletNumber);
  }



  @Patch()
  async update(@Req() req: any, @Body() updateDto: UpdateCryptoWalletBalanceDto) {
    const userId = req.user['id'];
    const wallet = await this.cryptoWalletService.findByWalletId(updateDto.walletId);
    if(wallet.userId !== userId) {
      throw new UnauthorizedException('You are not authorized to update this wallet');
    }
    return this.cryptoWalletService.updateCryptoWalletBalance(updateDto);
  }


}
