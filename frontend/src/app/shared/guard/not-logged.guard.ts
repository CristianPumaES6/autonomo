import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NotLogged implements CanActivate {

    constructor(private readonly router: Router, private readonly authService: AuthService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean {
        return this.authService.isLogged().pipe(
            map(val => !val),
            tap(val => val || this.router.navigate(['/'])),
        );
    }
}
