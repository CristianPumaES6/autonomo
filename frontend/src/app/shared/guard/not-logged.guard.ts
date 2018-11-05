import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NotLogged implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean {
        return this.authService.isLogged().map(val => !val).do(
            val => {
                if (!val) this.router.navigate(['/']);
            }
        );
    }
}
