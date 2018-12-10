import { BaseDB } from './baseDB';
import { db } from '../db';
import { IConfig } from '../../../../global/interfaces';

export class DBConfig extends BaseDB {
    constructor() {
        super(db.models.config);
    }

    public async getFromUser(id) {
        const user = await db.models.user.findOne({ where: { id } });
        return await this.db.findOne({ where: { userID: user.dataValues.id } });
    }

    public async putConfig(config: IConfig, userID: IConfig['id']) {
        return await this.db.update(config, { where: { userID } });
    }
}