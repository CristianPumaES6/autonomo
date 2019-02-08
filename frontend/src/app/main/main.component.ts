import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice/invoice.service';
import * as moment from 'moment';

@Component({
    selector: 'if-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    public chart = [];
    public total = [];
    public labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    year = moment().year();
    min = 2018;
    max = moment().year();

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
        backgroundColor: 'rgba(63, 81, 181, .7)',
        borderColor: 'rgba(63, 81, 181, 1)',
    }];

    constructor(protected readonly invoiceService: InvoiceService) { }

    ngOnInit() { this.getChar(); }

    getChar() {
        this.invoiceService.getCharts(this.year).subscribe(
            charts => {
                this.total = [({
                    data: charts.total,
                    label: 'Total facturas'
                })];
                this.chart = [({
                    data: charts.earned,
                    label: 'Total ganado'
                })];
                this.chart.push({
                    data: charts.wasted,
                    label: 'Total gastado'
                });
                this.chart.push({
                    data: charts.ivaEarn,
                    label: 'IVA devuelto'
                });
            }
        );
    }

    moreYear() {
        if (this.year !== this.max) {
            this.year++;
            this.getChar();
        }
    }

    lessYear() {
        if (this.year !== this.min) {
            this.year--;
            this.getChar();
        }
    }
}
