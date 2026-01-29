import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { ClientService } from '@/client/client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '@/client/models/client.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Client])],
    controllers: [WalletController],
    providers: [ClientService],
})
export class WalletModule { }