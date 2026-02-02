import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { CustomerEntity } from '../../customers/model/customer.entity';
import { BaseEntity } from '@/shared/classes/base.entity';
import { PaymentEntity } from '@/payments/model/payment.entity';

@Entity('wallets')
export class WalletEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double', default: 0 })
  balance: number;

  @Column({
    name: 'customer_id',
  })
  customerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.wallets)
  @JoinColumn({
    name: 'customer_id',
    referencedColumnName: 'id',
  })
  customer: CustomerEntity;

  @OneToMany(() => PaymentEntity, (payment) => payment.wallet)
  payments: PaymentEntity[];
}
