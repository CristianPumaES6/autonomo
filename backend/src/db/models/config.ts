import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity('Configs')
export class Config {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ default: 21 })
    ivaDefaultReceived?: number;

    @Column({ default: 0 })
    ivaDefaultSent?: number;

    @Column({ default: 0 })
    totalItemsByTable?: number;

    @OneToOne((type: any) => User, (user: User) => user.config)
    @JoinColumn()
    user: User;

    constructor(config: Config) {
        this.id = config ? config.id : undefined;
        this.ivaDefaultReceived = config ? config.ivaDefaultReceived : undefined;
        this.ivaDefaultSent = config ? config.ivaDefaultSent : undefined;
        this.totalItemsByTable = config ? config.totalItemsByTable : undefined;
    }
}
