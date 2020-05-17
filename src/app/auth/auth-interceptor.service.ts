import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http'
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

// ====================================================================================================

@Injectable()
export class AuthInterceptorService {

    constructor(private authService: AuthService) { }

    // ====================================================================================================

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.userSubject.pipe(
            take(1),
            exhaustMap(user => {
                // ^ Take says we only want to take 1 value from the obeservable, and then unsubscribe
                // Exhaust waits for the first observable to compelete (which happens when we 'take')...
                // then it gives us the user, and return a new observable to replace the previous one in the entire observable chain.
                if (!user) {
                    return next.handle(req);
                }
                const modifiedRequest = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedRequest)
            })
        );

    }
}