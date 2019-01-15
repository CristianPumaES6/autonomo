import { IConfig } from './config';

export interface IUser {
    id?: number;
    name?: string;
    password?: string;
    photo?: string;
    address?: string;
    phone?: string;
    email?: string;
    dni?: string;
    root?: boolean;
    deletedAt?: Date;

    configID?: number;
    config?: IConfig;
}