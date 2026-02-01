import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { PaymentEntity } from '../../payments/model/payment.entity';
import { BaseEntity } from '@/shared/classes/base.entity';

@Entity('payment_sessions')
export class PaymentSessionEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    otp: string;

    @Column()
    expiresAt: Date;

    @Column({ default: false })
    confirmed: boolean;

    @OneToOne(() => PaymentEntity, payment => payment.session)
    payment: PaymentEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
