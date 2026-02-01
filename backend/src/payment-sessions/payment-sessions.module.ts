import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentSessionEntity } from './model/payment-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentSessionEntity])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class PaymentSessionsModule { }
