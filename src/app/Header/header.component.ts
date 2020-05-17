import { Component, OnInit, OnDestroy } from '@angular/core';

import { RecipeService } from '../RecipeBook/recipes.service'
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

// =============================================================

export class HeaderComponent implements OnInit, OnDestroy {

    private userSub: Subscription;
    isAuthenticated = false;

    constructor(private recipeService: RecipeService, private authService: AuthService) {}

    ngOnInit() {
        this.userSub = this.authService.userSubject.subscribe(user => {
            this.isAuthenticated = !user ? false : true;
        })
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    onSaveData() {
        this.recipeService.storeRecipes()
    }

    onFetchData() {
        this.recipeService.fetchRecipes().subscribe()
        // Really the only reason we subscribe here is because the service is returning the response, so that the resolver can handle it.
    }
}
