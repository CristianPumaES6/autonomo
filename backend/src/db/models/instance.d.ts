import * as Sequelize from 'sequelize';

export interface IInstance<T> extends Sequelize.Instance<T> {
    dataValues: T;
}