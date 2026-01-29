// import { hashPassword } from '@auth/shared/functions/hash-password';
import { BaseEntity } from '@/shared/classes/base.entity';
import { IUser } from '@/user/shared/interfaces/user.interface';
import { Exclude } from 'class-transformer';
// import { Token } from 'src/token/models/token.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column()
  uuid: string;

  @Column({
    name: 'first_name',
    type: 'text',
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'text',
  })
  lastName: string;

  @Column({
    unique: true,
    type: 'text',
  })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({
    type: 'text',
  })
  password: string;

  @Exclude({ toPlainOnly: true })
  @Column({
    default: true,
  })
  active: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn({
    type: 'timestamptz',
    name: 'deleted_at',
  })
  deletedAt: Date;

  @Exclude({ toPlainOnly: true })
  @VersionColumn()
  version: number;

  // @BeforeInsert()
  // @BeforeUpdate()
  // async hashPassword() {
  //   this.password = await hashPassword(this.password);
  // }

  // @OneToMany(() => Token, (token) => token.user)
  // tokens: Token[];
}
