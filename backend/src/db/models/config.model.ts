import { IConfig } from '../../../../global/interfaces';
import { IInstance, IUnionUser } from '../instance';
import { Table, Model, Column, DataType, AutoIncrement, PrimaryKey, Default, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ paranoid: true, timestamps: true })
export class Config extends Model<IInstance<IConfig & IUnionUser>, IConfig & IUnionUser> {
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

    @BelongsTo(() => User)
    user?: User;
}
