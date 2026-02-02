import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, Generated } from 'typeorm';
import { PaymentEntity } from '../../payments/model/payment.entity';
import { BaseEntity } from '@/shared/classes/base.entity';

@Entity('payment_sessions')
export class PaymentSessionEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Generated('uuid')
    @Column({
        type: 'char',
        length: 36,
        default: () => 'UUID()',
    })
    uuid: string;

    @Column()
    otp: string;

    @Column()
    expiresAt: Date;

    @Column({ default: false })
    confirmed: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => PaymentEntity, payment => payment.session)
    payment: PaymentEntity;

}
