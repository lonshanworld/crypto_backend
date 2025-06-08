import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateExchangeOrderDto } from './dto/create-exchange-order.dto';
import { UpdateExchangeOrderDto } from './dto/update-exchange-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeOrder } from './entities/exchange-order.entity';
import { OrderRateExchange } from './entities/order-rate-exchange.entity';
import { Repository } from 'typeorm';
import { CryptoWallet } from 'src/crypto-wallet/entities/crypto-wallet.entity';

@Injectable()
export class ExchangeOrderService {
  
  constructor(
    @InjectRepository(ExchangeOrder) // Assuming ExchangeOrder is an entity
    private exchangeOrderRepository: Repository<ExchangeOrder>,

    @InjectRepository(OrderRateExchange) // Assuming OrderRateExchange is an entity
    private orderRateExchangeRepository: Repository<OrderRateExchange>,
    
    @InjectRepository(CryptoWallet)
    private cryptoWalletRepository: Repository<CryptoWallet>, // Assuming CryptoWallet is an entity
  ) {}

  async create(userId : number, createExchangeOrderDto: CreateExchangeOrderDto) {
    const checkWallet = await this.cryptoWalletRepository.findOne({
      where: {
        id: createExchangeOrderDto.primaryCryptoWalletId,
      },
    });
    if (!checkWallet) {
      throw new BadRequestException('Primary crypto wallet not found');
    } 
    if(checkWallet.balance < createExchangeOrderDto.totalPrimaryCryptoAmount) {
      throw new BadRequestException('Insufficient balance in primary crypto wallet');
    }

    const exchangeOrder = {
      createdById: userId,
      primaryCryptoWalletId: createExchangeOrderDto.primaryCryptoWalletId,
      secondaryCryptoWalletId: createExchangeOrderDto.secondaryCryptoWalletId,
      
    }
    const newExchangeOrder = await this.exchangeOrderRepository.save(exchangeOrder);
    const [primaryWallet, secondaryWallet] = await Promise.all([
      this.cryptoWalletRepository.findOne({
        where : {id : exchangeOrder.primaryCryptoWalletId}
      }),
      this.cryptoWalletRepository.findOne({
        where: { id: createExchangeOrderDto.secondaryCryptoWalletId }
      }),
    ]);
    

    const orderRateExchange = {
      exchangeOrderId: newExchangeOrder.id,

      amount: createExchangeOrderDto.totalSecondaryCryptoAmount,
      primaryCryptoCurrencyId: primaryWallet?.cryptoCurrencyId,
      secondaryCryptoCurrencyId: secondaryWallet?.cryptoCurrencyId,
      exchangeRate: createExchangeOrderDto.exchangeRate,
      totalPrimaryCryptoAmount: createExchangeOrderDto.totalPrimaryCryptoAmount,
      totalSecondaryCryptoAmount: createExchangeOrderDto.totalSecondaryCryptoAmount,
      remainingPrimaryCryptoAmount: createExchangeOrderDto.remainingPrimaryCryptoAmount,
      remainingSecondaryCryptoAmount: createExchangeOrderDto.remainingSecondaryCryptoAmount,
    }
    const newOrderRateExchange = await this.orderRateExchangeRepository.save(orderRateExchange);

    await this.cryptoWalletRepository.decrement(
      { id : createExchangeOrderDto.secondaryCryptoWalletId},
      'balance',
      createExchangeOrderDto.totalSecondaryCryptoAmount,
    );

    return {
      ...newExchangeOrder,
      orderRateExchange : newOrderRateExchange,
    }
  }

  findAllByUser(userId : number) {
    return this.exchangeOrderRepository.find({
      where : {createdById : userId},
    })
  }

  findOne(id: number) {
    return this.exchangeOrderRepository.findOne({
      where : {id}
    })
  }

  async update(updateExchangeOrderDto: UpdateExchangeOrderDto) {
    const exchangeOrder = await this.exchangeOrderRepository.findOne({
      where : {id : updateExchangeOrderDto.exchangeOrderId},
      relations: ['orderRateExchange', 'primaryCryptoWallet', 'secondaryCryptoWallet'],
    });
    if(!exchangeOrder){
      throw new BadRequestException('Exchange order not found');
    }

    if(exchangeOrder.orderRateExchange.remainingSecondaryCryptoAmount < updateExchangeOrderDto.secondaryCryptoAmount){
      throw new BadRequestException('Insufficient remaining crypto amount');
    }

    const updatePrimaryWalletOrder = await this.orderRateExchangeRepository.increment(
      {exchangeOrderId : updateExchangeOrderDto.exchangeOrderId},
      'remainingPrimaryCryptoAmount',
      updateExchangeOrderDto.primaryCryptoAmount,
    );

    const updateSecondaryWalletOrder = await this.orderRateExchangeRepository.decrement(
      {exchangeOrderId : updateExchangeOrderDto.exchangeOrderId},
      'remainingSecondaryCryptoAmount',
      updateExchangeOrderDto.secondaryCryptoAmount
    );

    const updateFirstWallet = await this.cryptoWalletRepository.increment(
      {id : exchangeOrder.primaryCryptoWalletId},
      'balance',
      updateExchangeOrderDto.primaryCryptoAmount,
    )

   

    return {
      ...exchangeOrder,
    }
  }

  
}
