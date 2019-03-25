import { IUser } from './user';
import { IModel } from './model';

export interface IConfig extends IModel {
    id?: number;
    ivaDefaultReceived?: number;
    ivaDefaultSent?: number;
    totalItemsByTable?: number;

    userID?: number;
    user?: IUser;
}