import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity('configs')
export class Config {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ default: 21 })
    ivaDefaultReceived?: number;

    @Column({ default: 0 })
    ivaDefaultSent?: number;

    @Column({ default: 0 })
    totalItemsByTable?: number;

    @OneToOne(type => User, (user: User) => user.config)
    @JoinColumn()
    user?: User | number;

    constructor(config?: Config) {
        if (config) {
            const { id, ivaDefaultReceived, ivaDefaultSent, totalItemsByTable, user } = config;
            this.id = id;
            this.ivaDefaultReceived = ivaDefaultReceived;
            this.ivaDefaultSent = ivaDefaultSent;
            this.totalItemsByTable = totalItemsByTable;
            this.user = user;
        }
    }
}
