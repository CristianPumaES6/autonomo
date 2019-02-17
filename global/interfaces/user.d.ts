import { IConfig } from './config';
import { IModel } from './model';

export interface IUser extends IModel {
    id?: number;
    name?: string;
    password?: string;
    photo?: string;
    address?: string;
    phone?: string;
    email?: string;
    dni?: string;
    root?: boolean;

    configID?: number;
    config?: IConfig;
}