import { IInvoice } from '../../../../global/interfaces';
import { IInstance } from '../instance';
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, AllowNull, Default } from 'sequelize-typescript';

@Table({ timestamps: true, paranoid: true })
export class Invoice extends Model<IInstance<IInvoice>, IInvoice> {
    @Column(DataType.UUIDV4)
    @PrimaryKey
    @AutoIncrement
    id?: number;
    
    @Column
    @AllowNull(false)
    cif?: string;
    
    @Column
    date?: Date;
    
    @Column
    fisicalAddress?: string;
    
    @Column
    nameCompany?: string;
    
    @Column(DataType.TEXT)
    notes?: string;

    @Column
    visualID?: string;

    @Column
    @Default(true)
    received?: boolean;
}
