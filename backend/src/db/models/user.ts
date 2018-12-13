import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Users')
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
    root?: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({ type: 'timestamp', default: null })
    deletedAt: Date;
}
