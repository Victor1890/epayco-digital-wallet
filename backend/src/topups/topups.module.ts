import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopupEntity } from './model/topup.entity';
import { TopupsController } from './topups.controller';
import { TopupsService } from './topups.service';
import { CustomersService } from '@/customers/customers.service';
import { WalletsService } from '@/wallets/wallets.service';

@Module({
  imports: [TypeOrmModule.forFeature([TopupEntity])],
  controllers: [TopupsController],
  providers: [TopupsService, CustomersService, WalletsService],
  exports: [TypeOrmModule, TopupsService],
})
export class TopupsModule { }
