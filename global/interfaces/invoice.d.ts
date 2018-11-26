export interface IInvoice {
    id?: number;
    date?: Date;
    price?: number;
    iva?: number;
    cif?: string;
    nameCompany?: string;
    fisicalAddress?: string;
    observations?: string;
    received?: boolean;
}