import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class Logged implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isLogged().do(
            val => {
                if (!val) this.router.navigate(['/auth']);
            }
        );
    }
}
