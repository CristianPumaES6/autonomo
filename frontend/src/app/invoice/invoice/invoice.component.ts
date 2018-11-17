import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { IInvoice } from '@isofocus/interfaces';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
    invoices: IInvoice[];
    dataSource: MatTableDataSource<IInvoice>;
    displayedColumns = ['id', 'cif', 'name', 'price'];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        protected invoiceService: InvoiceService,
        protected route: ActivatedRoute,
        protected router: Router,
    ) { }

    ngOnInit() {
        this.invoiceService.get().subscribe(invoices => {
            this.invoices = invoices;
            this.dataSource = new MatTableDataSource(invoices);
            this.dataSource.paginator = this.paginator;
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    clickRow(row: IInvoice) {
        this.router.navigate(['./', row.id], { relativeTo: this.route });
    }
}
