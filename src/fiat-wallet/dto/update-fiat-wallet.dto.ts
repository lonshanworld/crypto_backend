import { PartialType } from '@nestjs/mapped-types';
import { CreateFiatWalletDto } from './create-fiat-wallet.dto';

export class UpdateFiatWalletDto extends PartialType(CreateFiatWalletDto) {}
