import { IInvoice } from '../../../../global/interfaces';
import { DataTypes, Sequelize } from 'sequelize';
import { IInstance } from '../instance';

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
        nameCompany: {
            type: dataType.STRING,
        },
        notes: {
            type: dataType.TEXT,
        },
        visualID: {
            type: dataType.STRING,
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