import { PaymentEntity } from '@/payments/model/payment.entity';
import { BaseEntity } from '@/shared/classes/base.entity';
import { WalletEntity } from '@/wallets/model/wallet.entity';
import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, OneToMany } from 'typeorm';

@Entity({ name: 'customers' })
@Unique(['documento'])
@Unique(['email'])
@Unique(['celular'])
export class CustomerEntity extends BaseEntity {

  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documento: string;

  @Column()
  nombres: string;

  @Column()
  email: string;

  @Column()
  celular: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn({
    type: 'datetime',
    nullable: true,
    name: 'deleted_at',
  })
  deletedAt: Date;

  @OneToMany(() => WalletEntity, (wallet) => wallet.customer)
  wallets: WalletEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.customer)
  payments: PaymentEntity[];
}
