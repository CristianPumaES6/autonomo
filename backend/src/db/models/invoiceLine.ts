import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Invoice } from './invoice';

@Entity('invoiceLines')
export class InvoiceLine {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    iva?: number;

    @Column()
    desciption?: string;

    @Column()
    cuantity?: number;

    @Column({ type: 'decimal' })
    price?: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date;

    @Column({ type: 'timestamp', nullable: true, default: null })
    deletedAt?: Date | null;

    @ManyToOne(type => Invoice, invoice => invoice.invoiceLine)
    invoice?: Invoice | number;
}