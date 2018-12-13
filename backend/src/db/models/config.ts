import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class IConfig {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    ivaDefaultReceived?: number;

    @Column()
    ivaDefaultSent?: number;

    @Column()
    totalItemsByTable?: number;
}
