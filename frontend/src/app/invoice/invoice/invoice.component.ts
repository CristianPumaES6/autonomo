import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { IInvoice } from '@isofocus/interfaces';
import { MatTableDataSource, MatPaginator, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
    invoices: IInvoice[];
    dataSource: MatTableDataSource<IInvoice>;
    displayedColumns = ['id', 'date', 'received', 'cif', 'name', 'price', 'actions'];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        protected invoiceService: InvoiceService,
        protected route: ActivatedRoute,
        private snack: MatSnackBar,
        protected router: Router,
    ) { }

    ngOnInit() {
        this.invoiceService.get().subscribe(invoices => {
            this.invoices = invoices;
            this.dataSource = new MatTableDataSource(invoices);
            this.dataSource.paginator = this.paginator;
        });
    }

    applyFilter(filterValue: string) { this.dataSource.filter = filterValue.trim().toLowerCase(); }

    clickRow(row: IInvoice) { this.router.navigate(['./', row.id], { relativeTo: this.route }); }

    delete(invoice: IInvoice, event: Event) {
        event.stopPropagation();
        this.invoiceService.delete(+invoice.id).subscribe(() => {
            this.snack.open('Factura borrada correctamente', 'DESHACER').onAction().subscribe(
                () => {
                    this.invoiceService.restore(+invoice.id).subscribe(
                        () => {
                            this.invoices.push(invoice);
                            this.invoices.sort((f, s) => f.id - s.id);
                            this.dataSource.data = this.invoices;
                        }
                    );
                }
            );
            this.dataSource.data = this.invoices = this.invoices.filter(i => i.id !== invoice.id);
        });
    }
}
