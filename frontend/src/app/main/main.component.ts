import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice/invoice.service';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'if-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    public chart = [];
    public total = [];
    public labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    public colors = [
        { //EARN
            backgroundColor: 'rgba(144, 238, 144, .2)',
            borderColor: 'rgba(144, 238, 144, 1)',
            pointBackgroundColor: 'rgba(144, 238, 144, 1)',
            pointBorderColor: '#90EE90',
            pointHoverBackgroundColor: '#90EE90',
            pointHoverBorderColor: 'rgba(144, 238, 144, 0.8)'
        }, { // WASTED
            backgroundColor: 'rgba(240, 128, 128, .2)',
            borderColor: 'rgba(240, 128, 128, 1)',
            pointBackgroundColor: 'rgba(240, 128, 128, 1)',
            pointBorderColor: '#F08080',
            pointHoverBackgroundColor: '#F08080',
            pointHoverBorderColor: 'rgba(240, 128, 128, 0.8)'
        }, { // IVA EARN
            backgroundColor: 'rgba(255, 255, 158, .2)',
            borderColor: 'rgba(255, 255, 158, 1)',
            pointBackgroundColor: 'rgba(255, 255, 158, 1)',
            pointBorderColor: '#FFFF9E',
            pointHoverBackgroundColor: '#FFFF9E',
            pointHoverBorderColor: 'rgba(255, 255, 158, 0.8)'
        }
    ];

    public colorTotal = [{ // TOTAL
        backgroundColor: 'rgba(63, 81, 181, .2)',
        borderColor: 'rgba(63, 81, 181, 1)',
        pointBackgroundColor: 'rgba(63, 81, 181, 1)',
        pointBorderColor: '#3F51B5',
        pointHoverBackgroundColor: '#3F51B5',
        pointHoverBorderColor: 'rgba(63, 81, 181, 0.8)'
    }];

    constructor(protected invoiceService: InvoiceService) { }

    ngOnInit() {
        Observable.forkJoin(
            this.invoiceService.getChartTotal(),
            this.invoiceService.getChartEarned(),
            this.invoiceService.getChartWasted(),
            this.invoiceService.getChartIvaEarn(),
        ).subscribe(
            response => {
                this.total.push({
                    data: response[0],
                    label: 'Total facturas'
                });
                this.chart.push({
                    data: response[1],
                    label: 'Total ganado'
                });
                this.chart.push({
                    data: response[2],
                    label: 'Total gastado'
                });
                this.chart.push({
                    data: response[3],
                    label: 'IVA devuelto'
                });
            }
        );
    }
}
