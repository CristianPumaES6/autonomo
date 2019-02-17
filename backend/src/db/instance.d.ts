import * as Sequelize from 'sequelize';
import { IInvoice, IConfig, IInvoiceLine, IUser } from '../../../global/interfaces';

export interface IInstance<T> extends Sequelize.Instance<T> {
    dataValues: T;
}

export interface IUnionInvoices {
    setInvoices(invoice: IInvoice[] | IInstance<IInvoice>[] & any): void;
    getInvoices(): IInvoice[];
}

export interface IUnionInvoice {
    setInvoice(invoice: IInvoice[] | IInstance<IInvoice>[] & any): void;
    getInvoice(): IInvoice[];
}

export interface IUnionInvoiceLine {
    setInvoiceLines(invoiceLine: IInvoiceLine[] | IInstance<IInvoiceLine>[] & any): void;
    getInvoiceLines(): IInvoiceLine;
}

export interface IUnionUser {
    setUser(user: IUser | IInstance<IUser>[] & any): void;
    getUSer(): IUser;
}
