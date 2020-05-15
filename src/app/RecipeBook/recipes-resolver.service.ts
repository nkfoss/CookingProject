import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipes.service';

// The resolver runs before a route is loaded, to make sure that certain data the route depends on, is available.
@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.recipeService.fetchRecipes();
        // The resolver will subscribe for you. No need to do it explciitally.
    }
}