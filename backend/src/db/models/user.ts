import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { Config } from './config';
import { Invoice } from './invoice';

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

    @Column({ default: false })
    root?: boolean;

    @OneToOne(type => Config, (config: Config) => config.user)
    config: Config;

    @CreateDateColumn({ default: new Date() })
    createdAt: Date;

    @UpdateDateColumn({ default: new Date() })
    updatedAt: Date;

    @Column({ type: 'timestamp', default: null })
    deletedAt: Date;

    @OneToMany(type => Invoice, invoice => invoice.user)
    invoice: Invoice[];

    constructor(user?: User) {
        this.id = user ? user.id : undefined;
        this.name = user ? user.name : undefined;
        this.password = user ? user.password : undefined;
        this.photo = user ? user.photo : undefined;
        this.phone = user ? user.phone : undefined;
        this.email = user ? user.email : undefined;
        this.dni = user ? user.dni : undefined;
        this.root = user ? user.root : undefined;
        this.createdAt = user ? user.createdAt : undefined;
        this.updatedAt = user ? user.updatedAt : undefined;
        this.deletedAt = user ? user.deletedAt : undefined;
    }
}
