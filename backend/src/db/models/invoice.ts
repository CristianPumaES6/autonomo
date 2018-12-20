import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity('invoices')
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    iva: number;

    @Column()
    visualID: string;

    @Column()
    cif: string;

    @Column()
    nameCompany: string;

    @Column()
    fisicalAddress: string;

    @Column({ type: 'decimal', default: 0 })
    price: number;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    notes: string;

    @Column({ default: false })
    received: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date | null;

    @ManyToOne(type => User, user => user.invoice)
    user: User | number;

    constructor(invoice: Invoice) {
        const { id, date, iva, visualID, cif, nameCompany, fisicalAddress, price, description, notes, received, createdAt, updatedAt, deletedAt, user } = invoice!;
        this.id = id;
        this.date = date;
        this.iva = iva;
        this.visualID = visualID;
        this.cif = cif;
        this.nameCompany = nameCompany;
        this.fisicalAddress = fisicalAddress;
        this.price = price;
        this.description = description;
        this.notes = notes;
        this.received = received;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.user = user;
    }
}
