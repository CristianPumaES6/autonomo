import { Controller, Get, Headers, Param, Post, Body, Put, Delete, Header } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { auth } from '../shared/classes/auth';
import { IInvoice } from '../../../global/interfaces';

@Controller('invoice')
export class InvoicesController {
    constructor(private invoiceService: InvoicesService) { }

    @Get()
    async get(@Headers('authorization') authorization: string) {
        const userID = auth.decode(authorization);
        return this.invoiceService.get(userID);
    }

    @Get('next')
    async next(@Headers('authorization') authorization: string) {
        const userID = auth.decode(authorization); 
        return +((await this.invoiceService.next(userID)) || 0) + 1;
    }

    @Get('restore/:id')
    async restore(@Headers('authorization') authorization: string, @Param('id') id: number) {
        const userID = auth.decode(authorization);
        return this.invoiceService.restore(id, userID);
    }

    @Get('check/:id')
    async check(@Headers('authorization') authorization: string, @Param('id') id: number) {
        const userID = auth.decode(authorization);
        return { ok: await this.invoiceService.check(id, userID) };
    }
    
    @Get('total/size')
    async getTotalSize(@Headers('authorization') authorization: string) {
        const userID = auth.decode(authorization);
        return await this.invoiceService.totalSizeUsed(userID);
    }

    @Get(':id')
    async getID(@Headers('authorization') authorization: string, @Param('id') id: number) {
        const userID = auth.decode(authorization);
        return this.invoiceService.getID(userID, id);
    }

    @Get('pdf/:id')
    @Header('Content-Type', 'application/pdf')
    async pdf(@Headers('authorization') authorization: string, @Param('id') id: number) {
        const userID = auth.decode(authorization);
        return this.invoiceService.generatePDF(id, userID);
    }

    @Post()
    async post(@Body() invoice: IInvoice, @Headers('authorization') authorization: string) {
        const userID = auth.decode(authorization);
        delete invoice.id;
        invoice.userID = userID;
        return this.invoiceService.post(invoice);
    }

    @Put()
    async put(@Body() invoice: IInvoice & { file: any }, @Headers('authorization') authorization: string) {
        const userID = auth.decode(authorization);
        return this.invoiceService.put(invoice, userID);
    }

    @Delete(':id')
    async delete(@Headers('authorization') authorization: string, @Param('id') id: number) {
        const userID = auth.decode(authorization);
        return this.invoiceService.delete(id, userID);
    }
}
