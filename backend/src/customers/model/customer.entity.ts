import { BaseEntity } from '@/shared/classes/base.entity';
import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn } from 'typeorm';

@Entity({ name: 'customers' })
@Unique(['documento'])
@Unique(['email'])
@Unique(['celular'])
export class CustomerEntity extends BaseEntity {
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

  @Exclude({ toPlainOnly: true })
  @VersionColumn()
  version: number;
}
