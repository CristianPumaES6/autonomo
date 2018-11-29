import { IInvoice } from '@isofocus/interfaces';
import { DataTypes, Sequelize } from 'sequelize';
import { IInstance } from './instance';

export default function (sequelize: Sequelize, dataType: DataTypes) {
    return sequelize.define<IInstance<IInvoice>, IInvoice>('invoice', {
        id: {
            type: dataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cif: {
            type: dataType.STRING,
            allowNull: false,
        },
        date: {
            type: dataType.DATE,
            defaultValue: new Date(),
        },
        fisicalAddress: {
            type: dataType.STRING,
        },
        iva: {
            type: dataType.INTEGER,
        },
        nameCompany: {
            type: dataType.STRING,
        },
        price: {
            type: dataType.INTEGER,
        },
        observations: {
            type: dataType.STRING,
        },
        visualID: {
            type: dataType.INTEGER,
            unique: true,
        },
        received: {
            type: dataType.BOOLEAN,
            defaultValue: true,
        },
    }, {
            timestamps: true,
            paranoid: true
        }
    );
}
