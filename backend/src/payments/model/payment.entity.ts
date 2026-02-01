import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { WalletEntity } from '../../wallets/model/wallet.entity';
import { CustomerEntity } from '../../customers/model/customer.entity';
import { PaymentSessionEntity } from '../../payment-sessions/model/payment-session.entity';

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WalletEntity)
  @JoinColumn({ name: 'wallet_id' })
  wallet: WalletEntity;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @ManyToOne(() => PaymentSessionEntity, { nullable: true })
  @JoinColumn({ name: 'session_id' })
  session: PaymentSessionEntity;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount: number;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
