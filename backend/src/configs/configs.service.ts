import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { db } from '../db';
import { Config } from '../db/models/config';

@Injectable()
export class ConfigsService {
    async get(id: number) {
        const user = await db.models.users.findOne({ where: { id }, loadRelationIds: true });
        if (!user) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
        return await db.models.configs.findOne({ where: { id: user.config } });
    }

    async update(config: Config, id: number) {
        delete config.id;
        return await db.models.configs.update({ user: id }, config);
    }
}
