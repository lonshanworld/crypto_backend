// src/seed/initial.seed.ts
import { DataSource } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { FiatCurrencyType } from 'src/fiat-currency-type/entities/fiat-currency-type.entity';
import { CryptoCurrencyType } from 'src/crypto-currency-type/entities/crypto-currency-type.entity';
import * as bcrypt from 'bcryptjs';
import { KycStatus } from 'src/common/enums';

export async function runInitialSeed(dataSource: DataSource): Promise<void> {
  console.log('Running initial database seed...');

  const userRepository = dataSource.getRepository(User);
  const fiatCurrencyTypeRepository = dataSource.getRepository(FiatCurrencyType);
  const cryptoCurrencyTypeRepository = dataSource.getRepository(CryptoCurrencyType);

  // --- Seed Users ---
  const existingUser = await userRepository.findOne({ where: { email: 'test@example.com' } });
  if (!existingUser) {
    const passwordHash = await bcrypt.hash('StrongPassword123!', 10);
    const user1 = userRepository.create({
      email: 'test@example.com',
      name: 'Test User',
      passwordHash: passwordHash,
      kycStatus: KycStatus.VERIFIED,
    });
    await userRepository.save(user1);
    console.log('User "test@example.com" seeded.');
  }

  const existingUser2 = await userRepository.findOne({ where: { email: 'john.doe@example.com' } });
  if (!existingUser2) {
    const passwordHash2 = await bcrypt.hash('SecurePassword456!', 10);
    const user2 = userRepository.create({
      email: 'john.doe@example.com',
      name: 'John Doe',
      passwordHash: passwordHash2,
      kycStatus: KycStatus.PENDING,
    });
    await userRepository.save(user2);
    console.log('User "john.doe@example.com" seeded.');
  }

  // --- Seed FiatCurrencyTypes ---
  const existingThb = await fiatCurrencyTypeRepository.findOne({ where: { code: 'THB' } });
  if (!existingThb) {
    const thb = fiatCurrencyTypeRepository.create({
      name: 'Thai Baht',
      symbol: '฿',
      country: 'Thailand',
      code: 'THB',
    });
    await fiatCurrencyTypeRepository.save(thb);
    console.log('FiatCurrencyType "THB" seeded.');
  }

  const existingUsd = await fiatCurrencyTypeRepository.findOne({ where: { code: 'USD' } });
  if (!existingUsd) {
    const usd = fiatCurrencyTypeRepository.create({
      name: 'United States Dollar',
      symbol: '$',
      country: 'United States',
      code: 'USD',
    });
    await fiatCurrencyTypeRepository.save(usd);
    console.log('FiatCurrencyType "USD" seeded.');
  }

  // --- Seed CryptoCurrencyTypes ---
  const existingBtc = await cryptoCurrencyTypeRepository.findOne({ where: { code: 'BTC' } });
  if (!existingBtc) {
    const btc = cryptoCurrencyTypeRepository.create({
      name: 'Bitcoin',
      symbol: '₿',
      code: 'BTC',
    });
    await cryptoCurrencyTypeRepository.save(btc);
    console.log('CryptoCurrencyType "BTC" seeded.');
  }

  const existingEth = await cryptoCurrencyTypeRepository.findOne({ where: { code: 'ETH' } });
  if (!existingEth) {
    const eth = cryptoCurrencyTypeRepository.create({
      name: 'Ethereum',
      symbol: 'Ξ',
      code: 'ETH',
    });
    await cryptoCurrencyTypeRepository.save(eth);
    console.log('CryptoCurrencyType "ETH" seeded.');
  }

  console.log('Initial database seeding complete.');
}