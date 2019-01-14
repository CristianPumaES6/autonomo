import { IUser, IConfig } from '../../../../global/interfaces';
import { DataTypes, Sequelize } from 'sequelize';
import { IInstance, IUnionConfig, IUnionInvoice } from '../instance';

export default function (sequelize: Sequelize, dataType: DataTypes) {
    return sequelize.define<IInstance<IUser>, IUser>('user', {
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
            defaultValue: 'default.png',
        },
        email: {
            type: dataType.STRING(191),
            unique: true,
            allowNull: false,
        },
        dni: {
            type: dataType.STRING(191),
            unique: true,
            allowNull: false,
        },
        address: {
            type: dataType.STRING,
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