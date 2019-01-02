import * as Sequelize from 'sequelize';
import { IInvoice, IConfig, IInvoiceLine } from '../../../global/interfaces';

export interface IInstance<T> extends Sequelize.Instance<T> {
    dataValues: T;
}

export interface IUnionInvoice {
    setInvoices(invoice: IInvoice[] | IInstance<IInvoice>[]): void;
    getInvoices(): IInvoice[];
}

export interface IUnionConfig {
    setConfig(config: IConfig): void;
    getConfig(): IConfig;
}

export interface IUnionInvoiceLine {
    setInvoiceLines(invoiceLine: IInvoiceLine[] | IInstance<IInvoiceLine>[]): void;
    getInvoiceLines(): IInvoiceLine;
}