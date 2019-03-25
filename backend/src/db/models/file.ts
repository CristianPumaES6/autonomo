import { IInstance } from '../instance';
import { IFile } from '../../../../global/interfaces';
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, Sequelize, AllowNull } from 'sequelize-typescript';

@Table({ timestamps: true, paranoid: true })
export class File extends Model<IInstance<IFile>, IFile> {
    @Column(DataType.UUIDV4)
    @PrimaryKey
    @AutoIncrement
    id?: number;

    @Column
    @AllowNull(false)
    name?: string;
    
    @Column
    @AllowNull(false)
    path?: string;

    @Column(DataType.DECIMAL)
    size?: number;

    @Column
    type?: string;
}
