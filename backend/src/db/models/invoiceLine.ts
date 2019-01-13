import { IInvoiceLine } from '../../../../global/interfaces';
import { DataTypes, Sequelize } from 'sequelize';
import { IInstance } from '../instance';

export default function (sequelize: Sequelize, dataType: DataTypes) {
    return sequelize.define<IInstance<IInvoiceLine>, IInvoiceLine>('invoiceLine', {
        id: {
            type: dataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        quantity: {
            type: dataType.INTEGER,
            allowNull: false,
        },
        description: {
            type: dataType.STRING,
        },
        iva: {
            type: dataType.INTEGER,
        },
        price: {
            type: dataType.DOUBLE,
        },
    }, {
            timestamps: true,
            paranoid: true,
        },
    );
}