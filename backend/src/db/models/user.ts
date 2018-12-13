import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
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

    @Column()
    root?: boolean;
}
