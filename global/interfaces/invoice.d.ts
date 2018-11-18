export interface IInvoice {
    id?: string;
    date?: Date;
    price?: number;
    iva?: number;
    cif?: string;
    nameCompany?: string;
    fisicalAddress?: string;
    observations: string;
}