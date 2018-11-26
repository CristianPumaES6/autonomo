import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice/invoice.service';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'if-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    // lineChart
    public data = [];
    public labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    public data2 = [];

    public colors = [
        {
            backgroundColor: 'rgba(63, 81, 181, .2)',
            borderColor: 'rgba(63, 81, 181, 1)',
            pointBackgroundColor: 'rgba(63, 81, 181, 1)',
            pointBorderColor: '#3f51b5',
            pointHoverBackgroundColor: '#3f51b5',
            pointHoverBorderColor: 'rgba(63, 81, 181, 0.8)'
        }
    ];

    constructor(protected invoiceService: InvoiceService) { }

    ngOnInit() {
        Observable.forkJoin(
            this.invoiceService.getChartTotal(),
            this.invoiceService.getChartEarned()
        ).subscribe(
            response => {
                this.data.push({
                    data: response[0],
                    label: 'Total facturas'
                });
                this.data2.push({
                    data: response[1],
                    label: 'Total €'
                });
            }
        );
    }
}
