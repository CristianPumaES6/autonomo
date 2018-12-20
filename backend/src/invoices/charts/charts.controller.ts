import { Controller, Get, Headers } from '@nestjs/common';
import { ChartsService } from './charts.service';
import { auth } from '../../shared/classes/auth';

@Controller('invoice/chart')
export class ChartsController {
    constructor(private chartsService: ChartsService) { }

    @Get('total')
    async total(@Headers('authorization') authorization: string) {
        const id = auth.decode(authorization);
        return this.chartsService.getTotal(id);
    }

    @Get('earned')
    async earned(@Headers('authorization') authorization: string) {
        const id = auth.decode(authorization);
        return this.chartsService.geEarned(id);
    }

    @Get('wasted')
    async wasted(@Headers('authorization') authorization: string) {
        const id = auth.decode(authorization);
        return this.chartsService.getWasted(id);
    }

    @Get('ivaEarn')
    async ivaEarn(@Headers('authorization') authorization: string) {
        const id = auth.decode(authorization);
        return this.chartsService.getIvaEarn(id);
    }
}
