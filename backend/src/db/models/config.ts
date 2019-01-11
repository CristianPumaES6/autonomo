import { DataTypes, Sequelize } from 'sequelize';
import { IInstance } from '../instance';
import { IConfig } from '../../../../global/interfaces';

export default function (sequelize: Sequelize, dataType: DataTypes) {
    return sequelize.define<IInstance<IConfig>, IConfig>('config', {
        id: {
            type: dataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ivaDefaultReceived: {
            type: dataType.INTEGER,
            defaultValue: 21
        },
        ivaDefaultSent: {
            type: dataType.INTEGER,
            defaultValue: 0
        },
        totalItemsByTable: {
            type: dataType.INTEGER,
            defaultValue: 10
        }
    });
}
