import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './model/wallet.entity';

@Module({
    imports: [TypeOrmModule.forFeature([WalletEntity])],
    controllers: [],
    providers: [],
    exports: [TypeOrmModule],
})
export class WalletsModule { }
