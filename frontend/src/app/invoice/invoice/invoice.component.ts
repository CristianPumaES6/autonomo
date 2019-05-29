import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { IInvoice, IConfig } from '@isofocus/interfaces';
import { MatTableDataSource, MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../config/config.service';

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
    invoices: IInvoice[];
    dataSource: MatTableDataSource<IInvoice>;
    pageSizeOptions = [10, 50, 100];
    config: IConfig;
    displayedColumns = ['id', 'date', 'received', 'cif', 'name', 'actions'];
    sort: MatSort;
    loading: number[] = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) set matSort(sort: MatSort) {
        if (this.dataSource) this.dataSource.sort = sort;
        this.sort = sort;
    };

    constructor(
        protected readonly invoiceService: InvoiceService,
        protected readonly configService: ConfigService,
        protected readonly route: ActivatedRoute,
        private readonly snack: MatSnackBar,
        protected readonly router: Router,
    ) { }

    ngOnInit() {
        this.configService.getMy().subscribe(config => this.config = config);
        this.dataSource = new MatTableDataSource();
        this.paginator.pageSize = this.config.totalItemsByTable;

        this.invoiceService.get().subscribe(
            invoice => {
                this.invoices = invoice;
                this.dataSource.data = this.invoices;
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.pageSizeOptions.sort();
            }
        );
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

    getPDF(id: number, event: Event, actual: number) {
        this.loading.push(actual);
        event.stopPropagation();
        this.invoiceService.getPDF(id).subscribe(
            (response: any) => {
                const bytes = new Uint8Array(response.data);
                const blob = new Blob([bytes], { type: "application/pdf" });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                const fileName = id + '.pdf';
                link.download = fileName;
                link.click();
                this.loading = this.loading.filter(e => e !== actual);
            }
        );
    }
}
