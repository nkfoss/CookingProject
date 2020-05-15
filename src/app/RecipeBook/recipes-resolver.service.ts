import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipes.service';

// The resolver runs before a route is loaded, to make sure that certain data the route depends on, is available.
@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(private recipeService: RecipeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // We should only use the resolver if there are actually no recipes in the recipe service.
        // We get the recipes and then check the length. If it is greater than 0, then we simply return the recipes.
        // Else, we use the resolver.
        // This is done so the resolver doesn't overwrite any edits we make/submit.
        const recipes = this.recipeService.getRecipes()
        if (recipes.length < 1) {
            return this.recipeService.fetchRecipes();
        } else {
            return recipes
        }
        // The resolver will subscribe for you. No need to do it explciitally.
    }
}