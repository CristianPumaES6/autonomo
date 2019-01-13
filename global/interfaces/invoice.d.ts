import { IUser } from './user';
import { IInvoiceLine } from './invoiceLine';

export interface IInvoice {
    id?: number;
    date?: Date;
    cif?: string;
    nameCompany?: string;
    fisicalAddress?: string;
    notes?: string;
    received?: boolean;
    visualID?: number;

    userID?: number | IUser;

    invoiceLines?: IInvoiceLine[];
    invoiceLinesID?: number;
}