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
        const user = await db.models.users.findOne({ where: { id }, loadRelationIds: true });
        config.id = user.config as any;
        return await db.models.configs.save(config);
    }
}
