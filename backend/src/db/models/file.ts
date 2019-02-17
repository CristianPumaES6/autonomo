import { DataTypes, Sequelize } from 'sequelize';
import { IInstance } from '../instance';
import { IFile } from '../../../../global/interfaces';

export default function (sequelize: Sequelize, dataType: DataTypes) {
    return sequelize.define<IInstance<IFile>, IFile>('file', {
        id: {
            type: dataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: dataType.STRING,
        },
        path: {
            type: dataType.STRING,
        },
        size: { 
            type: dataType.DECIMAL,
        }
    }, { timestamps: true, paranoid: true });
}
