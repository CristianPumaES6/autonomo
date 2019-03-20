import * as Sequelize from 'sequelize';
import { IInvoice, IConfig, IInvoiceLine, IUser } from '../../../global/interfaces';

export interface IInstance<T> extends Sequelize.Model<T> {
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
    addInvoiceLine(invoiceLine: IInvoiceLine | IInstance<IInvoiceLine> & any): void; // TODO: DFOIBVHDFILVHSDFI
    getInvoiceLines(): IInvoiceLine;
}

export interface IUnionUser {
    setUser(user: IUser | IInstance<IUser>[] & any): void;
    getUSer(): IUser;
}
