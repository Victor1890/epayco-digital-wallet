import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@/database/data-source';
import { apiEnvValidation } from '@/shared/validators/api-env-validation.schema';
import { CustomersModule } from '@/customers/customers.module';
import { PaymentSessionsModule } from '@/payment-sessions/payment-sessions.module';
import { PaymentsModule } from '@/payments/payments.module';
import { TopupsModule } from '@/topups/topups.module';
import { WalletsModule } from '@/wallets/wallets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: apiEnvValidation,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    CustomersModule,
    PaymentSessionsModule,
    PaymentsModule,
    TopupsModule,
    WalletsModule,
  ],
})
export class AppModule { }
