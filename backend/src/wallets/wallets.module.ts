import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './model/wallet.entity';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { CustomersService } from '@/customers/customers.service';

@Module({
    imports: [TypeOrmModule.forFeature([WalletEntity])],
    controllers: [WalletsController],
    providers: [WalletsService, CustomersService],
    exports: [TypeOrmModule, WalletsService],
})
export class WalletsModule { }
