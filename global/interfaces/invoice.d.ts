import { IUser } from './user';
import { IInvoiceLine } from './invoiceLine';
import { IModel } from './model';

export interface IInvoice extends IModel {
    id?: number;
    date?: Date;
    cif?: string;
    nameCompany?: string;
    fisicalAddress?: string;
    notes?: string;
    received?: boolean;
    visualID?: string;

    userID?: number | IUser;

    invoiceLines?: IInvoiceLine[];
    invoiceLinesID?: number;
}