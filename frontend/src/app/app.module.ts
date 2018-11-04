import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GlobalInterceptor } from './shared/interceptor/interceptor.service';
import { LoggedGuard } from './shared/guard/logged.guard';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot([
            { path: '', component: MainComponent, canActivate: [LoggedGuard] },
            { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
            { path: '**', redirectTo: '' }
        ]),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
