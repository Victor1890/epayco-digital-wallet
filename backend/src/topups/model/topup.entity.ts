import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, BaseEntity, UpdateDateColumn } from 'typeorm';
import { WalletEntity } from '../../wallets/model/wallet.entity';
import { CustomerEntity } from '../../customers/model/customer.entity';

@Entity('topups')
export class TopupEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => WalletEntity)
  @JoinColumn({ name: 'wallet_id' })
  wallet: WalletEntity;
}
