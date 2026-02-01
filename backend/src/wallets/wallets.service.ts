import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletEntity } from './model/wallet.entity';

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(WalletEntity)
        private readonly walletRepo: Repository<WalletEntity>,
    ) { }

    async findByCustomerId(customerId: number): Promise<WalletEntity | null> {
        return this.walletRepo.findOne({ where: { customer: { id: customerId } } });
    }

    async getBalanceByCustomerId(customerId: number): Promise<number> {
        const wallet = await this.findByCustomerId(customerId);
        if (!wallet) throw new NotFoundException('Billetera no encontrada');
        return wallet.balance;
    }

    async createWalletForCustomer(customer: any): Promise<WalletEntity> {
        const wallet = this.walletRepo.create({ customer, balance: 0 });
        return this.walletRepo.save(wallet);
    }
}
