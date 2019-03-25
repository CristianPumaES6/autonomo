import { IUser } from '../../../../global/interfaces';
import { IInstance } from '../instance';
import { Model, Table, Column, PrimaryKey, AutoIncrement, DataType, AllowNull, Unique, Default } from 'sequelize-typescript';

@Table({ timestamps: true, paranoid: true })
export class User extends Model<IInstance<IUser>, IUser> {
    @Column(DataType.UUIDV4)
    @PrimaryKey
    @AutoIncrement
    id?: number;

    @Column
    @AllowNull(false)
    name?: string;

    @Column
    password?: string;

    @Column
    phone?: string;

    @Column(DataType.STRING(191))
    @Unique
    @AllowNull(false)
    email?: string;

    @Column
    @Unique
    @AllowNull(false)
    dni?: string;

    @Column(DataType.BIGINT)
    @Default(5120)
    max_file_size?: number;

    @Column
    address?: string;

    @Column
    root?: boolean;
}
