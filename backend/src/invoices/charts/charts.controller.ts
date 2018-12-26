import { Controller, Get, Headers } from '@nestjs/common';
import { ChartsService } from './charts.service';
import { auth } from '../../shared/classes/auth';

@Controller('invoice/chart')
export class ChartsController {
    constructor(private chartsService: ChartsService) { }

    @Get('all')
    async getAll(@Headers('authorization') authorization: string) {
        const id = auth.decode(authorization);
        return {
            total: await this.chartsService.getTotal(id),
            earned: await this.chartsService.geEarned(id),
            wasted: await this.chartsService.getWasted(id),
            ivaEarn: await this.chartsService.getIvaEarn(id),
        }
    }
}
