import { BaseEntity } from '@/shared/classes/base.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'clientes' })
export class Cliente extends BaseEntity {
    @Exclude({ toPlainOnly: true })
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    documento: string;

    @Column({ type: 'varchar', length: 255 })
    nombres: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 15 })
    celular: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Exclude({ toPlainOnly: true })
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}