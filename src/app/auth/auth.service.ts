import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import credentials from '../../../credentials/credentials.json';

interface AuthResponseData {   // We define the interface here, since we only need it here. Also, interface's are good practice.
    // This is the response payload's structure.
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresin: string,
    localid: string
}

@Injectable({providedIn: 'root'})
export class AuthService {

constructor(private http: HttpClient) {}

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
    );
    
}

signIn() {

}

}