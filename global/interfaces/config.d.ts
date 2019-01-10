import { IUser } from './user';

export interface IConfig {
    id?: number;
    ivaDefaultReceived?: number;
    ivaDefaultSent?: number;
    totalItemsByTable?: number;

    userID?: number;
    user?: IUser;
}