import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { FiatWalletService } from './fiat-wallet.service';
import { CreateFiatWalletDto } from './dto/create-fiat-wallet.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateFiatWalletBalanceDto } from './dto/update-fiat-wallet.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@Controller('fiat-wallet')
export class FiatWalletController {
  constructor(private readonly fiatWalletService: FiatWalletService) {}

  @Post()
  create(@Req() req : any,@Body() createFiatWalletDto: CreateFiatWalletDto) {
    const userId = req.user['id'];
    return this.fiatWalletService.create(userId, createFiatWalletDto);
  }

  @Get('getAllFiatWalletByUser')
  findAll(@Req() req: any) {
    const userId = req.user['id'];
    return this.fiatWalletService.findAllByUserId(userId);
  }

  @Get('findByWalletId/:id')
  findOne(@Param('id') id: string) {
    return this.fiatWalletService.finalByWalletId(+id);
  }

  @Get('findByWalletNumber/:walletNumber')
  findByWalletNumber(@Param('walletNumber') walletNumber: string) {
    return this.fiatWalletService.findByWalletNumber(walletNumber);
  }

  @Patch(':id')
  async update(@Req() req: any, @Body() updateFiatWalletDto: UpdateFiatWalletBalanceDto) {
    const userId = req.user['id'];
    const wallet =await this.fiatWalletService.finalByWalletId(updateFiatWalletDto.walletId);
    if (wallet?.userId !== userId) {
      throw new UnauthorizedException('You are not authorized to update this wallet');
    }
    return this.fiatWalletService.updateFiatWalletBalance(updateFiatWalletDto);
  }


}
