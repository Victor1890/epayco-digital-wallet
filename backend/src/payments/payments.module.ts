import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './model/payment.entity';
import { WalletEntity } from '@/wallets/model/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity, WalletEntity])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class PaymentsModule { }
