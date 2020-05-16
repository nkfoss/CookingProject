import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';




@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{

    constructor(private authService: AuthService) {}

    isLoginMode = true;
    isLoading = false;
    error: string = null;

    onSwitchMode() { 
        this.isLoginMode = !this.isLoginMode
        console.log(this.isLoginMode)
    }

    onSubmit(form: NgForm) {

        if (!form.valid) { return;}

        this.isLoading = true;
        if (this.isLoginMode) {
            //...
        } else {
            this.authService.signUp(form.value.email, form.value.password).subscribe( resData => {
                this.isLoading = false;
                console.log(resData)
            }, errorMessage => {
                this.isLoading = false;
                this.error = errorMessage;
                console.log(errorMessage)
            })
        }
        form.reset(); // Always reset the form.
    }
}