import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import credentials from '../../../credentials/credentials.json';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

// ====================================================================================================

export interface AuthResponseData {
    // We define the interface for response data, since we only need it int his service. Also, interfaces are good practice.
    // This is the response payload's structure. There are optional fields, because the exact structure depends on what request is being responded to.
    // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
    kind?: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localid: string,
    registered?: boolean
}

// ====================================================================================================

@Injectable({ providedIn: 'root' })
export class AuthService {

    userSubject = new BehaviorSubject<User>(null);
    // Behavior subjects give us access to the previous value before something subscribed to it

    // ====================================================================================================

    constructor(private http: HttpClient, private router: Router) { }

    // ====================================================================================================

    signUp(email: string, password: string) {
        const API_KEY = credentials.firebaseAPI;
        console.log(API_KEY);
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY,
            // The API key can be retrieved from your Firebase project settings.
            {
                email: email,
                password: password,
                returnSecureToken: true
                // This is the structure of the request payload
            }
        ).pipe(catchError(this.handleErrorResponse), tap(resData => {
            this.handleAuthentication(resData.email, resData.localid, resData.idToken, +resData.expiresIn)
        }))
    }


    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        // ^ Above, we convert the expiresIn time to seconds (from milliseconds), and add it to the current date.
        // Then, we wrap all that in a date constructor, so as to convert it back to a date object
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.userSubject.next(user);
        localStorage.setItem('userData', JSON.stringify(user)) // We turn the JS object to a string.
    }


    signIn(email: string, password: string) {
        const API_KEY = credentials.firebaseAPI;
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleErrorResponse), tap(resData => {
            this.handleAuthentication(resData.email, resData.localid, resData.idToken, +resData.expiresIn)
        }
        ))
    }


    autoSignIn() {
        const userData: {
            email: string,
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) { return; }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.token) {
            this.userSubject.next(loadedUser);
        }
    }


    logout() {
        this.userSubject.next(null);
        this.router.navigate(['/auth']);
    }


    private handleErrorResponse(errorRes: HttpErrorResponse) {
        let errorMessage = "An unknown error occurred"
        console.log(errorRes)
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }
        switch (errorRes.error.error.message) {
            case 'INVALID_PASSWORD':
                errorMessage = "Email or password is incorrect";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "Email or password is incorrect";
                break;
            case 'EMAIL_EXISTS':
                errorMessage = "This email is already in-use";
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = "Too many failed attempts. Please try again later."
                break;
        }
        return throwError(errorMessage)
    }

}