import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { RequestPaymentDto } from './shared/dto/request-payment.dto';
import { ConfirmPaymentDto } from './shared/dto/confirm-payment.dto';
import { PaymentEntity } from './model/payment.entity';
import { CustomersService } from '@/customers/customers.service';
import { WalletsService } from '@/wallets/wallets.service';
import { PaymentSessionsService } from '@/payment-sessions/payment-sessions.service';
import { WalletEntity } from '@/wallets/model/wallet.entity';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepo: Repository<PaymentEntity>,
        private readonly customersService: CustomersService,
        private readonly walletsService: WalletsService,
        private readonly paymentSessionsService: PaymentSessionsService,
        private readonly dataSource: DataSource,
    ) { }

    async requestPayment(dto: RequestPaymentDto) {

        const customer = await this.customersService.findByDocumentoAndCelular(dto.documento, dto.celular);
        if (!customer) throw new NotFoundException('Cliente no encontrado');

        const wallet = await this.walletsService.findByCustomerId(customer.id);
        if (!wallet) throw new NotFoundException('Billetera no encontrada');
        if (wallet.balance < dto.valor) throw new ForbiddenException('Saldo insuficiente');

        const payment = this.paymentRepo.create({
            wallet,
            customer,
            amount: dto.valor,
            status: 'pending',
        });

        await this.paymentRepo.save(payment);

        const { session, otp } = await this.paymentSessionsService.createSession(payment);

        return { message: 'Token enviado al email registrado', sessionId: session.uuid, otp };
    }

    async confirmPayment(payload: ConfirmPaymentDto) {

        const session = await this.paymentSessionsService.validateSession(payload.sessionId, payload.token);
        if (!session) throw new BadRequestException('Sesión o token inválido');

        return this.dataSource.transaction(async manager => {
            const payment = await manager.findOne(PaymentEntity, {
                where: {
                    session: {
                        id: session.id
                    }
                },
                relations: {
                    wallet: true
                }
            });

            if (!payment) throw new NotFoundException('Pago no encontrado');
            if (payment.status === 'confirmed') throw new BadRequestException('Pago ya confirmado');

            const wallet = await manager.findOne(WalletEntity, { where: { id: payment.wallet.id } });
            if (!wallet) throw new NotFoundException('Billetera no encontrada');

            if (wallet.balance < payment.amount) throw new ForbiddenException('Saldo insuficiente');
            wallet.balance -= payment.amount;
            payment.status = 'confirmed';

            await manager.save(wallet);
            await manager.save(payment);

            await this.paymentSessionsService.markSessionConfirmed(session, manager);
            return { message: 'Pago confirmado exitosamente', isValid: true };
        });
    }
}
