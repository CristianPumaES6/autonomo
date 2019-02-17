import { IModel } from './model';

export interface IInvoiceLine extends IModel {
    id?: number;
    iva?: number;
    description?: string;
    quantity?: number;
    price?: number;
}