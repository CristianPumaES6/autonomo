import { Controller, Get, Headers, Param } from '@nestjs/common';
import { ChartsService } from './charts.service';
import { auth } from '../../shared/classes/auth';

@Controller('invoice/chart')
export class ChartsController {
    constructor(private chartsService: ChartsService) { }

    @Get('/:year')
    async getAll(@Headers('authorization') authorization: string, @Param('year') year: number) {
        const id = auth.decode(authorization);
        return {
            total: await this.chartsService.getTotal(id, year),
            earned: await this.chartsService.geEarned(id, year),
            wasted: await this.chartsService.getWasted(id, year),
            ivaEarn: await this.chartsService.getIvaEarn(id, year),
        }
    }
}
