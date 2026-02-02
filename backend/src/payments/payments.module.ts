import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './model/payment.entity';
import { WalletEntity } from '@/wallets/model/wallet.entity';
import { PaymentsController } from './payments.controller';
import { CustomersModule } from '@/customers/customers.module';
import { WalletsModule } from '@/wallets/wallets.module';
import { PaymentSessionsModule } from '@/payment-sessions/payment-sessions.module';
import { PaymentsService } from './payments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity, WalletEntity]),
    forwardRef(() => CustomersModule),
    forwardRef(() => WalletsModule),
    forwardRef(() => PaymentSessionsModule),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [TypeOrmModule, PaymentsService],
})
export class PaymentsModule { }

