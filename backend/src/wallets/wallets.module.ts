import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './model/wallet.entity';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { CustomersModule } from '@/customers/customers.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([WalletEntity]),
        forwardRef(() => CustomersModule)
    ],
    controllers: [WalletsController],
    providers: [WalletsService],
    exports: [TypeOrmModule, WalletsService],
})
export class WalletsModule { }
