import * as sequelize from 'sequelize';
import { IInstance } from '../models/instance';

type modelItem = sequelize.Model<IInstance<any>, any>;

export class BaseDB {
    protected db: modelItem;

    constructor(model: modelItem) {
        this.db = model;
    }

    public async get();
    public async get(id?: number | string);
    public async get(id?: number | string) {
        return await (!id ? this.db.findAll() : this.db.find({ where: { id } }));
    }
    public async post<T>(toInsert: T) {
        return await (this.db.create(toInsert, { returning: true }));
    }
    public async put(toUpdate: any) {
        return await (this.db.update({ ...<any>toUpdate, deletedAt: null }, { where: { id: toUpdate.id } }));
    }
    public async delete(id: number | string, where?: sequelize.AnyWhereOptions) {
        return await (this.db.destroy({ where: { id, ...where } }));
    }
    public async restore(id: number) {
        return await (this.db.restore({ where: { id } }));
    }
}
