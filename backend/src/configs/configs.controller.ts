import { Controller, Get, Headers, Put, Body } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { auth } from '../shared/classes/auth';
import { Config } from '../db/models/config';

@Controller('config')
export class ConfigsController {
    constructor(private configService: ConfigsService) { }

    @Get()
    async get(@Headers('authorization') authorization: string) {
        const id = auth.decode(authorization);
        return await this.configService.get(id);
    }

    @Put()
    async update(@Headers('authorization') authorization: string, @Body() body: any) {
        const id = auth.decode(authorization);
        return await this.configService.update(body, id);
    }
}
