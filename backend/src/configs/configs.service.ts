import { Injectable } from '@nestjs/common';
import { db } from '../db';
import { Config } from '../db/models/config';

@Injectable()
export class ConfigsService {
    async get(id: number) {
        const user = await db.models.users.findOne({ where: { id }, loadRelationIds: true });
        return await db.models.configs.findOne({ where: { id: user.config } });
    }

    async update(config: Config, id: number) {
        delete config.id;
        return await db.models.configs.update({ user: id }, config);
    }
}
