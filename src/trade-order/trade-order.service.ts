import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTradeOrderDto } from './dto/create-trade-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { OrderRateTrade } from './entities/order-rate-trade.entity';
import { TradeOrder } from './entities/trade-order.entity';
import { CryptoWallet } from 'src/crypto-wallet/entities/crypto-wallet.entity';
import { UpdateTradeAmountDto } from './dto/update-trade-order.dto';
import { OrderType } from 'src/common/enums';
import { FiatWallet } from 'src/fiat-wallet/entities/fiat-wallet.entity';

@Injectable()
export class TradeOrderService {
  constructor(
    @InjectRepository(TradeOrder)
     private tradeOrderRepository: Repository<TradeOrder>,

    @InjectRepository(OrderRateTrade)
    private orderRateTradeRepository: Repository<OrderRateTrade>,

    @InjectRepository(CryptoWallet)
    private cryptoWalletRepository: Repository<CryptoWallet>,

    @InjectRepository(FiatWallet)
    private fiatWalletRepository : Repository<FiatWallet>,
  ) {}

  async create(userId: number, createTradeOrderDto: CreateTradeOrderDto) {
    const checkWallet = await this.cryptoWalletRepository.findOne({
      where: {
        id: createTradeOrderDto.cryptoWalletId,
      },
    });
    if (!checkWallet) {
      throw new BadRequestException('Crypto wallet not found');
    }

    if(checkWallet.balance < createTradeOrderDto.totalCryptoAmount) {
      throw new BadRequestException('Insufficient balance in crypto wallet');
    }

    const tradeOrder = {
      createdById : userId,
      cryptoWalletId: createTradeOrderDto.cryptoWalletId,
      fiatWalletId : createTradeOrderDto.fiatWalletId,
      orderType: createTradeOrderDto.orderType,
    };
    const newTradeOrder = await this.tradeOrderRepository.save(tradeOrder);
    
    const orderRateTrade = {
      tradeOrderId: newTradeOrder.id,
      cryptoCurrencyId: createTradeOrderDto.cryptoCurrencyId,
      fiatCurrencyId: createTradeOrderDto.fiatCurrencyId,
      pricePerCoin: createTradeOrderDto.pricePerCoin,
      totalCryptoAmount: createTradeOrderDto.totalCryptoAmount,
      totalFiatAmount: createTradeOrderDto.totalFiatAmount,
      remainingCryptoAmount: createTradeOrderDto.totalCryptoAmount,
      remainingFiatAmount: createTradeOrderDto.totalFiatAmount,
    };
    if(createTradeOrderDto.orderType === OrderType.BUY){
      await this.fiatWalletRepository.decrement(
        {id : createTradeOrderDto.fiatWalletId},
        'balance',
        createTradeOrderDto.totalFiatAmount,
      );
    }else{
      await this.cryptoWalletRepository.decrement(
        {id : createTradeOrderDto.cryptoWalletId},
        'balance',
        createTradeOrderDto.totalCryptoAmount,
      );
    }
    const newOrderRateTrade = await this.orderRateTradeRepository.save(orderRateTrade);
    return {
      ...newTradeOrder,
      orderRateTrade: newOrderRateTrade,
    };
  }

  findAllByUser(userId: number) {
    return this.tradeOrderRepository.find({
      where: { createdById: userId },
      relations: ['orderRateTrade', 'cryptoWallet', 'fiatWallet'],
    });
  }

  findOne(id: number) {
    return this.tradeOrderRepository.findOne({
      where: { id },
      relations: ['orderRateTrade', 'cryptoWallet', 'fiatWallet'],
    });
  }

  async update( updateTradeOrderDto: UpdateTradeAmountDto) {
    const tradeOrder = await this.tradeOrderRepository.findOne({
      where: { id: updateTradeOrderDto.orderId },
      relations: ['orderRateTrade', 'cryptoWallet'],
    });

    if (!tradeOrder) {
      throw new BadRequestException('Trade order not found');
    }

    if (tradeOrder.orderRateTrade.remainingCryptoAmount < updateTradeOrderDto.cryptoAmount) {
      throw new BadRequestException('Insufficient remaining crypto amount in trade order');
    }

    if(tradeOrder.orderType === OrderType.BUY){
      const updatedOrderRateTrade = await this.orderRateTradeRepository.increment(
        { id: tradeOrder.orderRateTrade.id },
        'remainingCryptoAmount',
        updateTradeOrderDto.cryptoAmount,
      );
  
      const updatedFiatAmount = await this.orderRateTradeRepository.decrement(
        { id: tradeOrder.orderRateTrade.id },
        'remainingFiatAmount',
        updateTradeOrderDto.fiatAmount,
      );

      const updatedCryptoWallet = await this.cryptoWalletRepository.increment(
        { id: tradeOrder.cryptoWalletId },
        'balance',
        updateTradeOrderDto.cryptoAmount,
      );

      const updatedFiatWallet = await this.cryptoWalletRepository.decrement(
        { id: tradeOrder.fiatWalletId },
        'balance',
        updateTradeOrderDto.fiatAmount,
      );

      

      if (!updatedOrderRateTrade || !updatedFiatAmount || !updatedCryptoWallet || !updatedFiatWallet) {
        throw new BadRequestException('Failed to update trade order amounts');
      }

      return {
        ...tradeOrder,
        orderRateTrade: updatedOrderRateTrade,
      };
    }else{
      const updatedOrderRateTrade = await this.orderRateTradeRepository.decrement(
        { id: tradeOrder.orderRateTrade.id },
        'remainingCryptoAmount',
        updateTradeOrderDto.cryptoAmount,
      );
  
      const updatedFiatAmount = await this.orderRateTradeRepository.increment(
        { id: tradeOrder.orderRateTrade.id },
        'remainingFiatAmount',
        updateTradeOrderDto.fiatAmount,
      );

      const updatedCryptoWallet = await this.cryptoWalletRepository.decrement(
        { id: tradeOrder.cryptoWalletId },
        'balance',
        updateTradeOrderDto.cryptoAmount,
      );

      const updatedFiatWallet = await this.cryptoWalletRepository.increment(
        { id: tradeOrder.fiatWalletId },
        'balance',
        updateTradeOrderDto.fiatAmount,
      );

      if (!updatedOrderRateTrade || !updatedFiatAmount || !updatedCryptoWallet || !updatedFiatWallet) {
        throw new BadRequestException('Failed to update trade order amounts');
      }

      return {
        ...tradeOrder,
        orderRateTrade: updatedOrderRateTrade,
      };
    }

  
  }

}
