import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { db } from '../db';
import { IConfig } from '../../../global/interfaces';

@Injectable()
export class ConfigsService {
    async get(id: number) {
        const user = (await db.models.user.findOne({ where: { id }, include: [db.models.config] }))!.dataValues;
        if (!user) throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        return user.config;
    }

    async update(config: IConfig, id: number) {
        delete config.id;
        return await db.models.config.update(config, { where: { user: id } });
    }
}
