import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { Config } from './config';
import { Invoice } from './invoice';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    @Column()
    password?: string;

    @Column()
    photo?: string;

    @Column()
    phone?: string;

    @Column()
    email?: string;

    @Column()
    dni?: string;

    @Column()
    address?: string;

    @Column({ default: false })
    root?: boolean;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt?: Date | null;

    @OneToOne(type => Config, (config: Config) => config.user)
    config?: Config | number;

    @OneToMany(type => Invoice, invoice => invoice.user)
    invoice?: Invoice[];
}
