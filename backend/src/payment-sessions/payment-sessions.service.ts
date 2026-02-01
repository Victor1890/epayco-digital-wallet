import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { PaymentSessionEntity } from './model/payment-session.entity';
import { PaymentEntity } from '@/payments/model/payment.entity';

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

@Injectable()
export class PaymentSessionsService {
    constructor(
        @InjectRepository(PaymentSessionEntity)
        private readonly sessionRepo: Repository<PaymentSessionEntity>,
    ) { }

    async createSession(payment: PaymentEntity) {
        const otp = generateOTP();
        const session = this.sessionRepo.create({
            otp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
            confirmed: false,
            payment,
        });
        await this.sessionRepo.save(session);
        return { session, otp };
    }

    async validateSession(sessionId: string, otp: string) {
        const session = await this.sessionRepo.findOne({ where: { id: Number(sessionId), otp, confirmed: false } });
        if (!session || session.expiresAt < new Date()) throw new BadRequestException('Sesión o token inválido/expirado');
        return session;
    }

    async markSessionConfirmed(sessionId: number, manager: EntityManager) {
        await manager.update(PaymentSessionEntity, { id: sessionId }, { confirmed: true });
    }
}
