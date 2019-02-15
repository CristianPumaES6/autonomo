import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { db } from '../db';
import { IConfig } from '../../../global/interfaces';

@Injectable()
export class ConfigsService {
    async get(id: number) {
        const user = (await db.models.user.findOne({ where: { id }, include: [db.models.config] }))!.dataValues;
        if (!user) throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        return (await db.models.config.findOne({ where: { id: user.config!.id } }))!.dataValues;
    }

    async update(config: IConfig, userID: number) {
        delete config.id;
        return await db.models.config.update(config, { where: { userID } });
    }
}
