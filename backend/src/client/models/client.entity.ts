import { BaseEntity } from '@/shared/classes/base.entity';
import { Token } from '@/token/models/token.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, VersionColumn, DeleteDateColumn, Generated } from 'typeorm';
import { IClient } from '../shared/interfaces/client.interface';

@Entity({ name: 'clients' })
export class Client extends BaseEntity implements IClient {
    @Exclude({ toPlainOnly: true })
    @PrimaryGeneratedColumn()
    id: number;

    @Generated('uuid')
    @Column()
    uuid: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    documento: string;

    @Column({ type: 'varchar', length: 255 })
    nombres: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 15 })
    celular: string;

    @Column({ type: 'double', default: 0 })
    saldo: number;

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

    @OneToMany(() => Token, (token) => token.client)
    tokens: Token[];
}