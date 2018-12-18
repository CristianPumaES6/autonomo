export interface IInvoice {
    id?: number;
    date?: Date;
    price?: number;
    iva?: number;
    cif?: string;
    nameCompany?: string;
    fisicalAddress?: string;
    description?: string;
    notes?: string;
    received?: boolean;
    visualID?: number;
}