import { IModels } from '..';

type modelItem = IModels[Extract<keyof IModels, string>];

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
        return await (this.db.update(toUpdate, { where: { id: toUpdate.id } }));
    }
    public async delete(id?: number | string) {
        return await (this.db.destroy({ where: { id } }));
    }
}
