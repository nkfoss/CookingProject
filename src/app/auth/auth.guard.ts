import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

// ==========================================================

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    // ==========================================================

    canActivate(
        route: ActivatedRouteSnapshot, 
        routerState: RouterStateSnapshot
    ):  boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {

        // Since the userSubject returns an observable, this is valid.
        // However, we need it to be a boolean observable instead of a User
        return this.authService.userSubject.pipe(
            take(1), // This is so we unsubscribe immediately. 
            map(user => {
            const isAuth = !!user; // Here, we simply use double exclamation mark to convert it from a User object (or null) into a boolean
            if (isAuth) {
                return true; // If we are authenticated, proceed down the route.
            }
            return this.router.createUrlTree(['/auth']) // If not, return a URL tree (observable or promise) that tells where to redirect
        }));
    }
}