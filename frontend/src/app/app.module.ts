import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Logged } from './shared/guard/logged.guard';
import { Interceptor } from './shared/interceptor/interceptor.service';
import { MaterialModule } from './shared/material.module';
import { NotLogged } from './shared/guard/not-logged.guard';
import { MenuComponent } from './menu/menu.component';
import { ChartsModule } from 'ng2-charts';
import { MAT_DATE_LOCALE, MatPaginatorIntl } from '@angular/material';
import { getSpanishINTL } from './shared/translate/paginator';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        MenuComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        ChartsModule,
        RouterModule.forRoot([
            { path: 'invoices', canActivate: [Logged], loadChildren: './invoice/invoice.module#InvoiceModule' },
            { path: 'profile', canActivate: [Logged], loadChildren: './profile/profile.module#ProfileModule' },
            { path: 'auth', canActivate: [NotLogged], loadChildren: './auth/auth.module#AuthModule' },
            { path: '', component: MainComponent, canActivate: [Logged] },
            { path: '**', redirectTo: '' }
        ]),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
        { provide: MatPaginatorIntl, useValue: getSpanishINTL() },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
