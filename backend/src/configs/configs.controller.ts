import { Controller, Get, Headers, Put, Body } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { auth } from '../shared/classes/auth';
import { IConfig } from '../../../global/interfaces';

@Controller('config')
export class ConfigsController {
    constructor(private configService: ConfigsService) { }

    @Get()
    async get(@Headers('authorization') authorization: string) {
        const id = auth.decode(authorization);
        const config = await this.configService.get(id);
        delete config!.id;
        return config;
    }

    @Put()
    update(@Headers('authorization') authorization: string, @Body() body: IConfig) {
        const id = auth.decode(authorization);
        return this.configService.update(body, id);
    }
}
