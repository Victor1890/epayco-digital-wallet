import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './model/wallet.entity';
import { WalletsService } from './wallets.service';

@Module({
    imports: [TypeOrmModule.forFeature([WalletEntity])],
    controllers: [],
    providers: [WalletsService],
    exports: [TypeOrmModule, WalletsService],
})
export class WalletsModule { }
