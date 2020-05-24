import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

// ====================================================================================================

export class AuthComponent{

    isLoginMode = true;
    isLoading = false;
    error: string = null;

    // ====================================================================================================

    constructor(private authService: AuthService, private router: Router) {}

    // ====================================================================================================

    onSwitchMode() { 
        this.isLoginMode = !this.isLoginMode
        console.log(this.isLoginMode)
    }


    onSubmit(form: NgForm) {

        this.error = null
        if (!form.valid) { return;}

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if (this.isLoginMode) {
            authObs = this.authService.signIn(form.value.email, form.value.password)
        } else {
            authObs =this.authService.signUp(form.value.email, form.value.password)
        }
        authObs.subscribe( resData => {
            this.isLoading = false;
            console.log(resData);
            this.router.navigate(['/recipes'])
        }, errorMessage => {
            this.isLoading = false;
            this.error = errorMessage;
            console.log(errorMessage)
        })

        form.reset(); // Always reset the form.
    }
    
}