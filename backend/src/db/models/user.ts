import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { Config } from './config';
import { Invoice } from './invoice';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    photo: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    dni: string;

    @Column()
    address: string;

    @Column({ default: false })
    root: boolean;

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

    constructor(user?: User) {
        const { id, name, password, photo, phone, email, dni, address, root, createdAt, updatedAt, deletedAt, config, invoice } = user!;
        this.id = id;
        this.name = name;
        this.password = password;
        this.photo = photo;
        this.phone = phone;
        this.email = email;
        this.dni = dni;
        this.address = address;
        this.root = root;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.config = config;
        this.invoice = invoice;
    }
}
