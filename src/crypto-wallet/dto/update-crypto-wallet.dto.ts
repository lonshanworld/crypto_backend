import { PartialType } from '@nestjs/mapped-types';
import { CreateCryptoWalletDto } from './create-crypto-wallet.dto';

export class UpdateCryptoWalletDto {
    reducedBalance?: number;
    newLockedBalance?: number;
}
