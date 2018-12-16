import { Controller, Get, Headers, Param, Post, Body, Put } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { auth } from '../shared/classes/auth';
import { Invoice } from '../db/models/invoice';

@Controller('invoice')
export class InvoicesController {
    constructor(private invoiceService: InvoicesService) { }

    @Get()
    get(@Headers('authorization') authorization: string) {
        const userID = auth.decode(authorization);
        return this.invoiceService.get(userID);
    }

    @Get(':id')
    getID(@Headers('authorization') authorization: string, @Param('id') id: number) {
        const userID = auth.decode(authorization);
        return this.invoiceService.getID(userID, id);
    }

    @Post()
    post(@Body() invoice: Invoice, @Headers('authorization') authorization: string) {
        const userID = auth.decode(authorization);
        invoice.user = userID;
        return this.invoiceService.post(invoice);
    }

    @Put()
    put(@Body() invoice: Invoice, @Headers('authorization') authorization: string) {
        const userID = auth.decode(authorization);
        return this.invoiceService.put(invoice, userID);
    }
}
