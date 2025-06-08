// src/seed/initial.seed.ts
import { DataSource, DeepPartial, ObjectLiteral, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity'; // Assuming you have this entity
import { FiatCurrencyType } from 'src/fiat-currency-type/entities/fiat-currency-type.entity';
import { CryptoCurrencyType } from 'src/crypto-currency-type/entities/crypto-currency-type.entity';
import { CryptoWallet } from 'src/crypto-wallet/entities/crypto-wallet.entity';
import { FiatWallet } from 'src/fiat-wallet/entities/fiat-wallet.entity';
import { TradeOrder } from 'src/trade-order/entities/trade-order.entity';
import { OrderRateTrade } from 'src/trade-order/entities/order-rate-trade.entity';
import { ExchangeOrder } from 'src/exchange-order/entities/exchange-order.entity';
import { OrderRateExchange } from 'src/exchange-order/entities/order-rate-exchange.entity';
import { TradeTransaction } from 'src/transactions/entities/trade-transaction.entity';
import { ExchangeTransaction } from 'src/transactions/entities/exchange-transaction.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';

import * as bcrypt from 'bcryptjs';
import { KycStatus, OrderStatus, OrderType, TransactionStatus, InvoiceType } from 'src/common/enums';

export async function runInitialSeed(dataSource: DataSource): Promise<void> {
  console.log('Running initial database seed...');

  // --- Get Repositories ---
  const userRepository = dataSource.getRepository(User);
  const fiatCurrencyTypeRepository = dataSource.getRepository(FiatCurrencyType);
  const cryptoCurrencyTypeRepository = dataSource.getRepository(CryptoCurrencyType);
  const cryptoWalletRepository = dataSource.getRepository(CryptoWallet);
  const fiatWalletRepository = dataSource.getRepository(FiatWallet);
  const tradeOrderRepository = dataSource.getRepository(TradeOrder);
  const orderRateTradeRepository = dataSource.getRepository(OrderRateTrade);
  const exchangeOrderRepository = dataSource.getRepository(ExchangeOrder);
  const orderRateExchangeRepository = dataSource.getRepository(OrderRateExchange);
  const tradeTransactionRepository = dataSource.getRepository(TradeTransaction);
  const exchangeTransactionRepository = dataSource.getRepository(ExchangeTransaction);
  const invoiceRepository = dataSource.getRepository(Invoice);


  // --- Seed Users ---
  const passwordHash1 = await bcrypt.hash('StrongPassword123!', 10);
  const user1 = await findOrCreate(userRepository, { email: 'test@example.com' }, {
    email: 'test@example.com',
    name: 'Test User',
    passwordHash: passwordHash1,
    kycStatus: KycStatus.VERIFIED,
  });
  console.log(`User "${user1.email}" seeded.`);

  const passwordHash2 = await bcrypt.hash('SecurePassword456!', 10);
  const user2 = await findOrCreate(userRepository, { email: 'john.doe@example.com' }, {
    email: 'john.doe@example.com',
    name: 'John Doe',
    passwordHash: passwordHash2,
    kycStatus: KycStatus.PENDING,
  });
  console.log(`User "${user2.email}" seeded.`);

  const passwordHash3 = await bcrypt.hash('AnotherPassword789!', 10);
  const user3 = await findOrCreate(userRepository, { email: 'jane.smith@example.com' }, {
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    passwordHash: passwordHash3,
    kycStatus: KycStatus.VERIFIED,
  });
  console.log(`User "${user3.email}" seeded.`);


  // --- Seed Currency Types ---
  const thb = await findOrCreate(fiatCurrencyTypeRepository, { code: 'THB' }, {
    name: 'Thai Baht',
    symbol: '฿',
    country: 'Thailand',
    code: 'THB',
  });
  console.log(`FiatCurrencyType "${thb.code}" seeded.`);

  const usd = await findOrCreate(fiatCurrencyTypeRepository, { code: 'USD' }, {
    name: 'United States Dollar',
    symbol: '$',
    country: 'United States',
    code: 'USD',
  });
  console.log(`FiatCurrencyType "${usd.code}" seeded.`);

  const btc = await findOrCreate(cryptoCurrencyTypeRepository, { code: 'BTC' }, {
    name: 'Bitcoin',
    symbol: '₿',
    code: 'BTC',
  });
  console.log(`CryptoCurrencyType "${btc.code}" seeded.`);

  const eth = await findOrCreate(cryptoCurrencyTypeRepository, { code: 'ETH' }, {
    name: 'Ethereum',
    symbol: 'Ξ',
    code: 'ETH',
  });
  console.log(`CryptoCurrencyType "${eth.code}" seeded.`);

  const xrp = await findOrCreate(cryptoCurrencyTypeRepository, { code: 'XRP' }, {
    name: 'Ripple',
    symbol: '✕',
    code: 'XRP',
  });
  console.log(`CryptoCurrencyType "${xrp.code}" seeded.`);


  // --- Seed Wallets ---
  // Wallets for test@example.com (user1)
  const user1BtcWallet = await findOrCreate(cryptoWalletRepository, { userId: user1.id, cryptoCurrencyId: btc.id }, {
    userId: user1.id,
    cryptoCurrencyId: btc.id,
    balance: 5.0, // Initial BTC balance
    lockedBalance: 0,
  });
  console.log(`User 1 BTC wallet seeded: ${user1BtcWallet.walletNumber}`);

  const user1EthWallet = await findOrCreate(cryptoWalletRepository, { userId: user1.id, cryptoCurrencyId: eth.id }, {
    userId: user1.id,
    cryptoCurrencyId: eth.id,
    balance: 50.0, // Initial ETH balance
    lockedBalance: 0,
  });
  console.log(`User 1 ETH wallet seeded: ${user1EthWallet.walletNumber}`);

  const user1ThbWallet = await findOrCreate(fiatWalletRepository, { userId: user1.id, fiatCurrencyId: thb.id }, {
    userId: user1.id,
    fiatCurrencyId: thb.id,
    balance: 1000000.00, // Initial THB balance
    lockedBalance: 0,
  });
  console.log(`User 1 THB wallet seeded: ${user1ThbWallet.walletNumber}`);

  // Wallets for john.doe@example.com (user2)
  const user2BtcWallet = await findOrCreate(cryptoWalletRepository, { userId: user2.id, cryptoCurrencyId: btc.id }, {
    userId: user2.id,
    cryptoCurrencyId: btc.id,
    balance: 10.0,
    lockedBalance: 0,
  });
  console.log(`User 2 BTC wallet seeded: ${user2BtcWallet.walletNumber}`);

  const user2UsdWallet = await findOrCreate(fiatWalletRepository, { userId: user2.id, fiatCurrencyId: usd.id }, {
    userId: user2.id,
    fiatCurrencyId: usd.id,
    balance: 50000.00,
    lockedBalance: 0,
  });
  console.log(`User 2 USD wallet seeded: ${user2UsdWallet.walletNumber}`);

  // Wallets for jane.smith@example.com (user3)
  const user3XrpWallet = await findOrCreate(cryptoWalletRepository, { userId: user3.id, cryptoCurrencyId: xrp.id }, {
    userId: user3.id,
    cryptoCurrencyId: xrp.id,
    balance: 1000.0,
    lockedBalance: 0,
  });
  console.log(`User 3 XRP wallet seeded: ${user3XrpWallet.walletNumber}`);


  // --- Seed Trade Orders (BTC/THB) ---
  // User1 wants to SELL 1 BTC for THB
  const order1TotalCryptoAmount = 1;
  const order1PricePerCoin = 1000000; // 1 BTC = 1,000,000 THB
  const order1TotalFiatAmount = order1TotalCryptoAmount * order1PricePerCoin;

  const tradeOrder1 = await findOrCreate(tradeOrderRepository, { createdById: user1.id, orderType: OrderType.SELL, cryptoWalletId: user1BtcWallet.id, fiatWalletId: user1ThbWallet.id }, {
    createdById: user1.id,
    cryptoWalletId: user1BtcWallet.id,
    fiatWalletId: user1ThbWallet.id,
    orderType: OrderType.SELL,
  });
  // Link to OrderRateTrade
  const orderRateTrade1 = await findOrCreate(orderRateTradeRepository, { tradeOrderId: tradeOrder1.id }, {
    tradeOrderId: tradeOrder1.id,
    cryptoCurrencyId: btc.id,
    fiatCurrencyId: thb.id,
    pricePerCoin: order1PricePerCoin,
    totalCryptoAmount: order1TotalCryptoAmount,
    totalFiatAmount: order1TotalFiatAmount,
    remainingCryptoAmount: order1TotalCryptoAmount, // Initially all remaining
    remainingFiatAmount: order1TotalFiatAmount, // Initially all remaining
  });
  console.log(`Trade Order (SELL BTC) by User 1 seeded. Order ID: ${tradeOrder1.id}`);

  // User2 wants to BUY 0.5 BTC using USD
  const order2TotalCryptoAmount = 0.5;
  const order2PricePerCoin = 30000; // 1 BTC = 30,000 USD
  const order2TotalFiatAmount = order2TotalCryptoAmount * order2PricePerCoin;

  const tradeOrder2 = await findOrCreate(tradeOrderRepository, { createdById: user2.id, orderType: OrderType.BUY, cryptoWalletId: user2BtcWallet.id, fiatWalletId: user2UsdWallet.id }, {
    createdById: user2.id,
    cryptoWalletId: user2BtcWallet.id,
    fiatWalletId: user2UsdWallet.id,
    orderType: OrderType.BUY,
  });
  const orderRateTrade2 = await findOrCreate(orderRateTradeRepository, { tradeOrderId: tradeOrder2.id }, {
    tradeOrderId: tradeOrder2.id,
    cryptoCurrencyId: btc.id,
    fiatCurrencyId: usd.id,
    pricePerCoin: order2PricePerCoin,
    totalCryptoAmount: order2TotalCryptoAmount,
    totalFiatAmount: order2TotalFiatAmount,
    remainingCryptoAmount: order2TotalCryptoAmount,
    remainingFiatAmount: order2TotalFiatAmount,
  });
  console.log(`Trade Order (BUY BTC) by User 2 seeded. Order ID: ${tradeOrder2.id}`);


  // --- Seed Exchange Orders (ETH to XRP) ---
  // User1 wants to exchange 10 ETH for XRP
  const exchangeOrder1TotalPrimaryCrypto = 10;
  const exchangeOrder1Rate = 50; // 1 ETH = 50 XRP
  const exchangeOrder1TotalSecondaryCrypto = exchangeOrder1TotalPrimaryCrypto * exchangeOrder1Rate;

  const exchangeOrder1 = await findOrCreate(exchangeOrderRepository, { createdById: user1.id, primaryCryptoWalletId: user1EthWallet.id, secondaryCryptoWalletId: user3XrpWallet.id }, { // Assuming user3XrpWallet is the target for user1
    createdById: user1.id,
    primaryCryptoWalletId: user1EthWallet.id, // User 1's ETH wallet
    secondaryCryptoWalletId: user3XrpWallet.id, // User 3's XRP wallet (as an example receiver)
    status: OrderStatus.OPEN,
  });
  const orderRateExchange1 = await findOrCreate(orderRateExchangeRepository, { exchangeOrderId: exchangeOrder1.id }, {
    exchangeOrderId: exchangeOrder1.id,
    primaryCryptoCurrencyId: eth.id,
    secondaryCryptoCurrencyId: xrp.id,
    exchangeRate: exchangeOrder1Rate,
    totalPrimaryCryptoAmount: exchangeOrder1TotalPrimaryCrypto,
    totalSecondaryCryptoAmount: exchangeOrder1TotalSecondaryCrypto,
    remainingPrimaryCryptoAmount: exchangeOrder1TotalPrimaryCrypto,
    remainingSecondaryCryptoAmount: exchangeOrder1TotalSecondaryCrypto,
  });
  console.log(`Exchange Order (ETH to XRP) by User 1 seeded. Order ID: ${exchangeOrder1.id}`);


  // --- Seed Trade Transactions ---
  // Simulate User2 buying 0.5 BTC from TradeOrder1 (User1 selling BTC)
  // This transaction will partially fill TradeOrder1.
  const tradeTransaction1CryptoAmount = 0.5;
  const tradeTransaction1FiatAmount = tradeTransaction1CryptoAmount * orderRateTrade1.pricePerCoin; // Using price from OrderRateTrade1

  // Ensure wallets have enough balance for a transaction
  // For simplicity, we'll assume balances are already there from seeding wallets
  // In a real scenario, you'd apply business logic for deductions/additions.

  // Simulate updating balances as if transaction occurred
  // User1 (seller of BTC, so receives THB)
  await fiatWalletRepository.increment({ id: user1ThbWallet.id }, 'balance', tradeTransaction1FiatAmount);
  await cryptoWalletRepository.decrement({ id: user1BtcWallet.id }, 'balance', tradeTransaction1CryptoAmount);

  // User2 (buyer of BTC, so sends THB)
  await fiatWalletRepository.decrement({ id: user2UsdWallet.id }, 'balance', tradeTransaction1FiatAmount); // This is USD wallet, would need cross-currency logic
  await cryptoWalletRepository.increment({ id: user2BtcWallet.id }, 'balance', tradeTransaction1CryptoAmount);

  const tradeTx1 = await findOrCreate(tradeTransactionRepository, { orderId: tradeOrder1.id, sellerId: user1.id, buyerId: user2.id }, {
    sellerId: user1.id, // User 1 is selling BTC from tradeOrder1
    buyerId: user2.id, // User 2 is buying BTC
    orderId: tradeOrder1.id,
    rateId: orderRateTrade1.id,
    tradedCryptoAmount: tradeTransaction1CryptoAmount,
    tradedFiatAmount: tradeTransaction1FiatAmount,
    usedCryptoWalletId: user1BtcWallet.id, // User1's wallet (seller)
    usedFiatWalletId: user2UsdWallet.id, // User2's wallet (buyer)
    tradeTime: new Date(),
    cryptoReleaseTime: new Date(),
    completedTime: new Date(),
    status: TransactionStatus.COMPLETED,
  });
  console.log(`Trade Transaction 1 seeded. Tx ID: ${tradeTx1.id}`);

  // Update remaining amounts in TradeOrder1
  await orderRateTradeRepository.decrement({ id: orderRateTrade1.id }, 'remainingCryptoAmount', tradeTransaction1CryptoAmount);
  await orderRateTradeRepository.decrement({ id: orderRateTrade1.id }, 'remainingFiatAmount', tradeTransaction1FiatAmount);
  console.log(`Trade Order 1 remaining amounts updated.`);


  // --- Seed Exchange Transactions ---
  // Simulate a partial fill of ExchangeOrder1 (User1 exchanges ETH for XRP from User3)
  const exchangeTx1PrimaryAmount = 5;
  const exchangeTx1SecondaryAmount = exchangeTx1PrimaryAmount * orderRateExchange1.exchangeRate;

  // Simulate updating balances
  // User1 (exchanges ETH, receives XRP)
  await cryptoWalletRepository.decrement({ id: user1EthWallet.id }, 'balance', exchangeTx1PrimaryAmount);
  await cryptoWalletRepository.increment({ id: user3XrpWallet.id }, 'balance', exchangeTx1SecondaryAmount); // User 3's wallet as receiver

  const exchangeTx1 = await findOrCreate(exchangeTransactionRepository, { orderId: exchangeOrder1.id, ownerId: user1.id, receiverId: user3.id }, {
    ownerId: user1.id, // User 1 initiated the exchange
    receiverId: user3.id, // User 3 is the counterparty
    orderId: exchangeOrder1.id,
    rateId: orderRateExchange1.id,
    tradedPrimaryCryptoAmount: exchangeTx1PrimaryAmount,
    tradedSecondaryCryptoAmount: exchangeTx1SecondaryAmount,
    usedPrimaryCryptoWalletId: user1EthWallet.id,
    usedSecondaryCryptoWalletId: user3XrpWallet.id,
    tradeTime: new Date(),
    cryptoReleaseTime: new Date(),
    completedTime: new Date(),
    status: TransactionStatus.COMPLETED,
  });
  console.log(`Exchange Transaction 1 seeded. Tx ID: ${exchangeTx1.id}`);

  // Update remaining amounts in ExchangeOrder1
  await orderRateExchangeRepository.decrement({ id: orderRateExchange1.id }, 'remainingPrimaryCryptoAmount', exchangeTx1PrimaryAmount);
  await orderRateExchangeRepository.decrement({ id: orderRateExchange1.id }, 'remainingSecondaryCryptoAmount', exchangeTx1SecondaryAmount);
  console.log(`Exchange Order 1 remaining amounts updated.`);


  // --- Seed Invoices ---
  // Invoice for Trade Transaction 1 (User 1 - Seller Invoice)
  await findOrCreate(invoiceRepository, { userId: user1.id, tradeTransactionId: tradeTx1.id, invoiceType: InvoiceType.TRADE, totalAmount: tradeTx1.tradedFiatAmount, fiatCurrencyId: thb.id }, {
    userId: user1.id,
    invoiceType: InvoiceType.TRADE,
    tradeTransactionId: tradeTx1.id,
    totalAmount: tradeTx1.tradedFiatAmount, // Seller gets fiat
    fiatCurrencyId: thb.id, // Assuming the fiat currency for this specific transaction
  });
  console.log(`Invoice for User 1 (Trade Tx 1 Seller) seeded.`);

  // Invoice for Trade Transaction 1 (User 2 - Buyer Invoice)
  await findOrCreate(invoiceRepository, { userId: user2.id, tradeTransactionId: tradeTx1.id, invoiceType: InvoiceType.TRADE, totalAmount: tradeTx1.tradedCryptoAmount, cryptoCurrencyId: btc.id }, {
    userId: user2.id,
    invoiceType: InvoiceType.TRADE,
    tradeTransactionId: tradeTx1.id,
    totalAmount: tradeTx1.tradedCryptoAmount, // Buyer gets crypto
    cryptoCurrencyId: btc.id, // Assuming the crypto currency for this specific transaction
  });
  console.log(`Invoice for User 2 (Trade Tx 1 Buyer) seeded.`);

  // Invoice for Exchange Transaction 1 (User 1 - Owner Invoice)
  await findOrCreate(invoiceRepository, { userId: user1.id, exchangeTransactionId: exchangeTx1.id, invoiceType: InvoiceType.EXCHANGE, totalAmount: exchangeTx1.tradedPrimaryCryptoAmount, cryptoCurrencyId: eth.id }, {
    userId: user1.id,
    invoiceType: InvoiceType.EXCHANGE,
    exchangeTransactionId: exchangeTx1.id,
    totalAmount: exchangeTx1.tradedPrimaryCryptoAmount, // Owner gives primary crypto
    cryptoCurrencyId: eth.id,
  });
  console.log(`Invoice for User 1 (Exchange Tx 1 Owner) seeded.`);

  // Invoice for Exchange Transaction 1 (User 3 - Receiver Invoice)
  await findOrCreate(invoiceRepository, { userId: user3.id, exchangeTransactionId: exchangeTx1.id, invoiceType: InvoiceType.EXCHANGE, totalAmount: exchangeTx1.tradedSecondaryCryptoAmount, cryptoCurrencyId: xrp.id }, {
    userId: user3.id,
    invoiceType: InvoiceType.EXCHANGE,
    exchangeTransactionId: exchangeTx1.id,
    totalAmount: exchangeTx1.tradedSecondaryCryptoAmount, // Receiver gets secondary crypto
    cryptoCurrencyId: xrp.id,
  });
  console.log(`Invoice for User 3 (Exchange Tx 1 Receiver) seeded.`);


  console.log('Initial database seeding complete.');
}

/**
 * Helper function to find an entity by criteria or create and save it if not found.
 * This ensures idempotency for seeding.
 */
async function findOrCreate<T extends ObjectLiteral>(
  repository: Repository<T>,
  criteria: Partial<T>,
  data: Partial<T>, // This is still correct for what you pass in
): Promise<T> {
  let entity = await repository.findOne({ where: criteria });
  if (!entity) {
    // Cast 'data' to DeepPartial<T> before passing it to repository.create()
    entity = repository.create(data as DeepPartial<T>); // <--- CHANGE THIS LINE
    await repository.save(entity);
  }
  return entity;
}