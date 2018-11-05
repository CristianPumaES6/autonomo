import { NgModule } from '@angular/core';
import {
    MatSidenavModule,
    MatCheckboxModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule
} from '@angular/material';


@NgModule({
    imports: [
        MatSidenavModule,
        MatCheckboxModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        MatToolbarModule,
    ],
    exports: [
        MatToolbarModule,
        MatSnackBarModule,
        MatButtonModule,
        MatCardModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatInputModule,
    ]
})
export class MaterialModule { }
