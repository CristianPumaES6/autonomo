import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { ChartsModule } from './charts/charts.module';

@Module({
    controllers: [InvoicesController],
    providers: [InvoicesService],
    imports: [ChartsModule],
})
export class InvoicesModule { }
