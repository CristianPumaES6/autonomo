import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggedGuard } from './shared/guard/logged.guard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Interceptor } from './shared/interceptor/interceptor.service';
import { MaterialModule } from './shared/material.module';
import { NotLogged } from './shared/guard/not-logged.guard';
import { ClockComponent } from './clock/clock.component';
import { MenuModule } from './menu/menu.module';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        ClockComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        HttpClientModule,
        MaterialModule,
        MenuModule,
        RouterModule.forRoot([
            { path: '', component: MainComponent, canActivate: [LoggedGuard] },
            { path: 'auth', canActivate: [NotLogged], loadChildren: './auth/auth.module#AuthModule' },
            { path: '**', redirectTo: '' }
        ]),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
