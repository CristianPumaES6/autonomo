import { Controller, Get, Headers, Put, Body } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { auth } from '../shared/classes/auth';

@Controller('config')
export class ConfigsController {
    constructor(private configService: ConfigsService) { }

    @Get()
    get(@Headers('authorization') authorization: string) {
        const id = auth.decode(authorization);
        return this.configService.get(id);
    }

    @Put()
    update(@Headers('authorization') authorization: string, @Body() body: any) {
        const id = auth.decode(authorization);
        return this.configService.update(body, id);
    }
}
