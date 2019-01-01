import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user';
import { InvoiceLine } from './invoiceLine';

@Entity('invoices')
export class Invoice {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    date?: Date;

    @Column()
    visualID?: string;

    @Column()
    cif?: string;

    @Column()
    nameCompany?: string;

    @Column()
    fisicalAddress?: string;

    @Column({ nullable: true })
    notes?: string;

    @Column({ default: false })
    received?: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt?: Date | null;

    @ManyToOne(type => User, user => user.invoice)
    user?: User | number;

    @OneToMany(type => InvoiceLine, invoiceLine => invoiceLine.invoice)
    invoiceLine?: InvoiceLine[] | number[];
}
