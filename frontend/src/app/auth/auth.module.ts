import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: AuthComponent },
            { path: '**', redirectTo: '' }
        ]),
    ],
    declarations: [AuthComponent]
})
export class AuthModule { }
