import { IInvoiceLine } from '../../../../global/interfaces';
import { IInstance } from '../instance';
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript';

@Table({ timestamps: true, paranoid: true })
export class InvoiceLine extends Model<IInstance<IInvoiceLine>, IInvoiceLine> {
    @Column(DataType.UUIDV4)
    @PrimaryKey
    @AutoIncrement
    id?: number;
    
    @Column
    @AllowNull(false)
    quantity?: number;
    
    @Column
    description?: string;
    
    @Column
    iva?: number;
    
    @Column(DataType.DOUBLE)
    price?: number;
}
