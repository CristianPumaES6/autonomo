import { IConfig } from '../../../../global/interfaces';
import { IInstance } from '../instance';
import { Table, Model, Column, DataType, AutoIncrement, PrimaryKey, Default, BelongsTo } from 'sequelize-typescript';

@Table({ paranoid: true, timestamps: true })
export class Config extends Model<IInstance<IConfig>, IConfig> {
    @Column(DataType.UUIDV4)
    @AutoIncrement
    @PrimaryKey
    id?: number;

    @Column(DataType.INTEGER)
    @Default(21)
    IvaDefaultReceived?: number;

    @Column
    @Default(0)
    ivaDefaultSent?: number;

    @Column
    @Default(10)
    totalItemsByTable?: number;
}
