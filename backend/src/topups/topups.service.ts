import { CustomersService } from '@/customers/customers.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { TopupEntity } from './model/topup.entity';
import { CreateTopupDto } from './shared/dto/create-topup.dto';
import { WalletsService } from '@/wallets/wallets.service';

@Injectable()
export class TopupsService {
    constructor(
        @InjectRepository(TopupEntity)
        private readonly topupRepo: Repository<TopupEntity>,
        private readonly customersService: CustomersService,
        private readonly walletsService: WalletsService,
        private readonly dataSource: DataSource,
    ) { }

    async topupWallet(payload: CreateTopupDto) {
        const customer = await this.customersService.findByDocumentoAndCelular(payload.documento, payload.celular);
        if (!customer) throw new NotFoundException('Cliente no encontrado');

        const wallet = await this.walletsService.findByCustomerId(customer.id);
        if (!wallet) throw new NotFoundException('Billetera no encontrada');

        return this.dataSource.transaction(async manager => {

            const topup = this.topupRepo.create({
                wallet,
                customer,
                amount: payload.valor,
            });
            await manager.save(topup);
            wallet.balance += payload.valor;

            await manager.save(wallet);

            return { balance: wallet.balance };
        });
    }
}
