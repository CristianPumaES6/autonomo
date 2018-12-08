import { IUser, IConfig } from '@isofocus/interfaces';
import { DataTypes, Sequelize } from 'sequelize';
import { IInstance } from './instance';

export default function (sequelize: Sequelize, dataType: DataTypes) {
    return sequelize.define<IInstance<IUser> & {
        setInvoices(invoices: any[]),
        getInvoices(),
        getConfig(),
        setConfig(config: IConfig),
    }, IUser>('user', {
        id: {
            type: dataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: dataType.STRING,
            allowNull: false,
        },
        password: {
            type: dataType.STRING,
        },
        phone: {
            type: dataType.STRING,
        },
        photo: {
            type: dataType.STRING,
        },
        email: {
            type: dataType.STRING,
            unique: true,
            allowNull: false,
        },
        dni: {
            type: dataType.STRING,
            unique: true,
            allowNull: false,
        },
        nick: {
            type: dataType.STRING,
            unique: true,
            allowNull: false,
        },
        root: {
            type: dataType.BOOLEAN,
            defaultValue: false,
        },
    }, {
            timestamps: true,
            paranoid: true,
        },
    );
}
