import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { tap } from 'rxjs/operators';

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
        return this.authService.isLogged().pipe(
            tap(
                val => {
                    if (!val) this.router.navigate(['/auth']);
                }
            )
        )
    }
}
