import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentSessionEntity } from './model/payment-session.entity';
import { PaymentSessionsService } from './payment-sessions.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentSessionEntity])],
  controllers: [],
  providers: [PaymentSessionsService],
  exports: [TypeOrmModule, PaymentSessionsService],
})
export class PaymentSessionsModule { }
