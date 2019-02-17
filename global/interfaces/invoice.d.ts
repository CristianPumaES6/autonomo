import { IUser } from './user';
import { IInvoiceLine } from './invoiceLine';
import { IModel } from './model';
import { IFile } from './file';

export interface IInvoice extends IModel {
    id?: number;
    date?: Date;
    cif?: string;
    nameCompany?: string;
    fisicalAddress?: string;
    notes?: string;
    received?: boolean;
    visualID?: string;

    user?: IUser;
    userID?: number;

    invoiceLines?: IInvoiceLine[];
    invoiceLinesID?: number;

    file?: IFile;
    fileID?: number;
}