import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import type { TokenType } from '../shared/enums/types.interface';
import { IToken } from '../shared/interfaces/token.interface';
import { BaseEntity } from '@/shared/classes/base.entity';
import { Client } from '@/client/models/client.entity';

@Entity({ name: 'tokens' })
export class Token extends BaseEntity implements IToken {
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column()
  uuid: string;

  @Column({
    type: 'varchar',
    length: 70,
  })
  type: TokenType;

  @Column({ type: 'varchar', length: 255 })
  token: string;

  @Column({ default: false })
  used: boolean;

  @Column({ type: 'json' })
  payload: ObjectI = {};

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'client_id', type: 'int' })
  clientId: number;

  @Column({
    type: 'datetime',
    name: 'expired_at',
  })
  expiredAt: Date;

  @Column({
    type: 'datetime',
    nullable: true,
    name: 'completed_at',
  })
  completedAt: Date | null;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
  })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at',
  })
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

  @ManyToOne(() => Client, (client) => client.tokens)
  @JoinColumn({
    name: 'client_id',
    referencedColumnName: 'id',
  })
  client: Relation<Client>;
}
