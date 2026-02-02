import { CustomersModule } from '@/customers/customers.module';
import { WalletsService } from '@/wallets/wallets.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopupEntity } from './model/topup.entity';
import { TopupsController } from './topups.controller';
import { TopupsService } from './topups.service';
import { WalletsModule } from '@/wallets/wallets.module';

@Module({
  imports: [TypeOrmModule.forFeature([TopupEntity]), CustomersModule, WalletsModule],
  controllers: [TopupsController],
  providers: [TopupsService],
  exports: [TypeOrmModule, TopupsService],
})
export class TopupsModule { }
