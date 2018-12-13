import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Invoices')
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
    observations?: string;

    @Column({ default: false })
    received?: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({ type: 'timestamp', default: null })
    deletedAt: Date;
}
