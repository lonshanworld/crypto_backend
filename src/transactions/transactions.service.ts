import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TradeTransaction } from './entities/trade-transaction.entity';
import { ExchangeTransaction } from './entities/exchange-transaction.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { User } from 'src/user/entities/user.entity';
import { TradeOrder } from 'src/trade-order/entities/trade-order.entity';
import { In, Repository } from 'typeorm';
import { InvoiceType, OrderType } from 'src/common/enums';
import { TradeOrderService } from 'src/trade-order/trade-order.service';
import { CreateTradeTransactionDto } from './dto/create-trade-transaction.dto';
import { InvoiceService } from 'src/invoice/invoice.service';
import { FiatWallet } from 'src/fiat-wallet/entities/fiat-wallet.entity';
import { CryptoWallet } from 'src/crypto-wallet/entities/crypto-wallet.entity';
import { CreateExchangeTransactionDto } from './dto/create-exchange-transaction.dto';
import { ExchangeOrder } from 'src/exchange-order/entities/exchange-order.entity';
import { ExchangeOrderService } from 'src/exchange-order/exchange-order.service';
import { UpdateExchangeOrderDto } from 'src/exchange-order/dto/update-exchange-order.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TradeTransaction)
    private tradeTransactionRepository: Repository<TradeTransaction>,

    @InjectRepository(ExchangeTransaction)
    private exchangeTransactionRepository: Repository<ExchangeTransaction>, 

    @InjectRepository(TradeOrder)
    private tradeOrderRepository: Repository<TradeOrder>,

    @InjectRepository(ExchangeOrder)
    private exchangeOrderRepository : Repository<ExchangeOrder>,

    @InjectRepository(CryptoWallet)
    private cryptoWalletRepository: Repository<CryptoWallet>,

    @InjectRepository(FiatWallet)
    private fiatWalletRepository: Repository<FiatWallet>,
     
    private tradeOrderService : TradeOrderService,
    private invoiceService: InvoiceService,
    private exchangeOrderService : ExchangeOrderService,
  ) {}

  async createTradeTransaction(currentUserId : number, createTransactionDto: CreateTradeTransactionDto) {
    const tradeOrder = await this.tradeOrderRepository.findOne({
      where: { id: createTransactionDto.tradeOrderId },
      relations : ['orderRateTrade']
    });
    if (!tradeOrder) {
      throw new Error('Trade order not found');
    }
    const currentDatetime = new Date();
    const newTransaction = {
      sellerId : tradeOrder.orderType === OrderType.BUY ? currentUserId : tradeOrder.createdById,
      buyerId : tradeOrder.orderType === OrderType.BUY ? tradeOrder.createdById : currentUserId,
      orderId: tradeOrder.id,
      rateId: tradeOrder.orderRateTrade.id,
      tradedCryptoAmount: createTransactionDto.tradedCryptoAmount,
      tradedFiatAmount: createTransactionDto.tradedFiatAmount,
      usedCryptoWalletId: createTransactionDto.usedCryptoWalletId,
      usedFiatWalletId: createTransactionDto.usedFiatWalletId,
      tradeTime : currentDatetime,
      cryptoReleaseTime: currentDatetime, // This will be set later when crypto is released
      completedTime: currentDatetime, // This will be set later when the transaction is completed
    };

    if(tradeOrder.orderType === OrderType.BUY){
      await Promise.all([
        this.cryptoWalletRepository.decrement(
          {id : createTransactionDto.usedCryptoWalletId},
          'balance',
          createTransactionDto.tradedCryptoAmount,
        ),
        this.fiatWalletRepository.increment(
          {id : createTransactionDto.usedFiatWalletId},
          'balance',
          createTransactionDto.tradedFiatAmount,
        ),
        this.cryptoWalletRepository.increment(
          {id : tradeOrder.cryptoWalletId},
          'balance',
          createTransactionDto.tradedCryptoAmount,
        ),
      ]);
    }else{
      await Promise.all([
        this.cryptoWalletRepository.increment(
          {id : createTransactionDto.usedCryptoWalletId},
          'balance',
          createTransactionDto.tradedCryptoAmount,
        ),
        this.fiatWalletRepository.decrement(
          {id : createTransactionDto.usedFiatWalletId},
          'balance',
          createTransactionDto.tradedFiatAmount,
        ),
        this.fiatWalletRepository.increment(
          {id : tradeOrder.fiatWalletId},
          'balance',
          createTransactionDto.tradedFiatAmount,
        ),
      ]);
    }

    const [cryptoWallet, fiatWallet] = await Promise.all([
      this.cryptoWalletRepository.findOne({ where: { id: createTransactionDto.usedCryptoWalletId }, relations: ['cryptoCurrencyType'] }),
      this.fiatWalletRepository.findOne({ where: { id: createTransactionDto.usedFiatWalletId }, relations: ['cryptoCurrencyType']  }),
    ]);

    const newTradeTransaction = await this.tradeTransactionRepository.save(newTransaction);
    await this.tradeOrderService.update({
      orderId: tradeOrder.id,
      cryptoAmount : createTransactionDto.tradedCryptoAmount,
      fiatAmount : createTransactionDto.tradedFiatAmount,
    });
    await Promise.all([
      this.tradeOrderService.update({
        orderId: tradeOrder.id,
        cryptoAmount: createTransactionDto.tradedCryptoAmount,
        fiatAmount: createTransactionDto.tradedFiatAmount,
      }),
      this.invoiceService.create({
        userId : newTransaction.sellerId,
        invoiceType : InvoiceType.TRADE,
        tradeTransactionId: newTradeTransaction.id,
        totalAmount : tradeOrder.orderType === OrderType.SELL ? newTransaction.tradedCryptoAmount : newTransaction.tradedFiatAmount,
        cryptoCurrencyId: cryptoWallet?.cryptoCurrencyId || undefined,
      }),
      this.invoiceService.create({
        userId : newTransaction.buyerId,
        invoiceType : InvoiceType.TRADE,
        tradeTransactionId: newTradeTransaction.id,
        totalAmount : tradeOrder.orderType === OrderType.SELL ? newTransaction.tradedFiatAmount : newTransaction.tradedCryptoAmount,
        fiatCurrencyId: fiatWallet?.fiatCurrencyId || undefined,
      }),
    ]);
    return newTradeTransaction; 
  }

  async createExchangeTransaction(currentUserId : number , createExchangeTransaction : CreateExchangeTransactionDto){
    
    const exchangeOrder = await this.exchangeOrderRepository.findOne({
      where : {id : createExchangeTransaction.exchangeOrderId},
      relations : ['orderRateExchange', 'primaryCryptoWallet', 'secondaryCryptoWallet']
    });

    if(!exchangeOrder){
      throw new BadRequestException("Exchange Order Not Found");
    }

    const currentDate = new Date();
    const newTransaction = {
      ownerId : currentUserId,
      receiverId : exchangeOrder.createdById,
      rateId : exchangeOrder.orderRateExchange.id,
      orderId : exchangeOrder.id,
      tradedPrimaryCryptoAmount : createExchangeTransaction.tradedPrimaryCryptoAmount,
      tradedSecondaryCryptoAmount: createExchangeTransaction.tradedSecondaryCryptoAmount,
      usedPrimaryCryptoWalletId : createExchangeTransaction.primaryWalletId,
      usedSecondaryCryptoWalletId : createExchangeTransaction.secondaryWalletId,
      tradeTime : currentDate,
      cryptoReleaseTime : currentDate,
      completedTime : currentDate,
    };
    // const newExchangeTransaction =  this.exchangeTransactionRepository.create(newTransaction);
    const newExchangeTransaction = await this.exchangeTransactionRepository.save(newTransaction);

    const updateExchangeOrder : UpdateExchangeOrderDto = {
        exchangeOrderId : exchangeOrder.id,
        primaryCryptoAmount : createExchangeTransaction.tradedPrimaryCryptoAmount,
        secondaryCryptoAmount : createExchangeTransaction.tradedSecondaryCryptoAmount,
      } ;
    await Promise.all([
      
      this.cryptoWalletRepository.decrement(
        {id : createExchangeTransaction.primaryWalletId},
        'balance',
        createExchangeTransaction.tradedPrimaryCryptoAmount,
      ),
      this.cryptoWalletRepository.increment(
        {id : createExchangeTransaction.secondaryWalletId},
        'balance',
        createExchangeTransaction.tradedSecondaryCryptoAmount,
      ),
      this.cryptoWalletRepository.increment(
        {id : exchangeOrder.primaryCryptoWalletId},
        'balance',
        createExchangeTransaction.tradedPrimaryCryptoAmount,
      ),
      this.exchangeOrderService.update(updateExchangeOrder),
      this.invoiceService.create({
        userId : currentUserId,
        invoiceType : InvoiceType.EXCHANGE,
        exchangeTransactionId : newExchangeTransaction.id,
        cryptoCurrencyId : exchangeOrder.secondaryCryptoWallet.cryptoCurrencyId,
        totalAmount : createExchangeTransaction.tradedSecondaryCryptoAmount
      }),
      this.invoiceService.create({
        userId : exchangeOrder.createdById,
        invoiceType : InvoiceType.EXCHANGE,
        exchangeTransactionId : newExchangeTransaction.id,
        cryptoCurrencyId : exchangeOrder.primaryCryptoWallet.cryptoCurrencyId,
        totalAmount : createExchangeTransaction.tradedPrimaryCryptoAmount
      }),
    ]);

    return newExchangeTransaction;
  }
  
  findAllByUserId(userId: number) {
    return this.tradeTransactionRepository.find({
      where: [
        { sellerId: userId },
        { buyerId: userId },
      ],
    });
  }

  findOne(id: number) {
    return this.tradeTransactionRepository.findOne({
      where: { id: id },
    });
  }
}
