import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity('invoices')
export class Invoice {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    date?: Date;

    @Column()
    iva?: number;

    @Column()
    visualID?: string;

    @Column()
    cif?: string;

    @Column()
    nameCompany?: string;

    @Column()
    fisicalAddress?: string;

    @Column({ type: 'decimal', default: 0 })
    price?: number;

    @Column()
    description?: string;

    @Column()
    notes?: string;

    @Column({ default: false })
    received?: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({ type: 'timestamp', default: null })
    deletedAt: Date;

    @ManyToOne(type => User, user => user.invoice)
    user: User | number;
}
