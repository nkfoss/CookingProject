import { Component } from '@angular/core';

import { RecipeService } from '../RecipeBook/recipes.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

// =============================================================

export class HeaderComponent {

    constructor(private recipeService: RecipeService) {}

    onSaveData() {
        this.recipeService.storeRecipes()
    }

    onFetchData() {
        this.recipeService.fetchRecipes()
    }
}
