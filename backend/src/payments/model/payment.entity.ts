import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { WalletEntity } from '../../wallets/model/wallet.entity';
import { CustomerEntity } from '../../customers/model/customer.entity';
import { PaymentSessionEntity } from '../../payment-sessions/model/payment-session.entity';

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount: number;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.payments)
  @JoinColumn({
    name: 'wallet_id',
    referencedColumnName: 'id',
  })
  wallet: WalletEntity;

  @ManyToOne(() => CustomerEntity, (customer) => customer.payments)
  @JoinColumn({
    name: 'customer_id',
    referencedColumnName: 'id',
  })
  customer: CustomerEntity;

  @OneToOne(() => PaymentSessionEntity, { nullable: true })
  @JoinColumn({
    name: 'session_id',
    referencedColumnName: 'id',
  })
  session: PaymentSessionEntity;

}
