import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../ShoppingList/shopping-list.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

// ==============================================================

@Injectable()
export class RecipeService {

  recipeSelected = new Subject<Recipe>();
  recipesUpdated = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  // ==============================================================

  constructor(private shoppingListService: ShoppingListService,
    private http: HttpClient,
    private authService: AuthService) { }

  // ==============================================================

  storeRecipes() {
    this.http.put(
      'https://cooking-project-6da97.firebaseio.com/recipes.json',
      this.recipes)
      .subscribe(response => {
        console.log(response)
      })
  }

  fetchRecipes() {
    return this.authService.userSubject.pipe(
      take(1), exhaustMap(user => {
        // ^ Take says we only want to take 1 value from the obeservable, and then unsubscribe
        // Exhaust waits for the first observable to compelete (which happens when we 'take')...
        // then it gives us the user, and return a new observable to replace the previous one in the entire observable chain.
        return this.http
          .get<Recipe[]>(
            'https://cooking-project-6da97.firebaseio.com/recipes.json',
            {
              params: new HttpParams().set('auth', user.token)
            }
          );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
          };
          // This is done in case we fetch a recipe with no ingredients (which can cause errors when we fetch)
          // Basically, for each recipe in recipes, if recipe.ingredients is truish, then set it normally.
          // otherwise, make it an empty array (otherwise it will be null which is bad)
        });
      }),
      tap(fetchedRecipes => {
        console.log(fetchedRecipes)
        this.recipes = fetchedRecipes
        this.recipesUpdated.next(this.recipes.slice())
      })
    );
  }

  getRecipes() {

    // return this.recipes;

    // We don't implement it this way, because arrays are 'reference-types' in JS.
    // That means if another component gets this recipe list, and edits it, then the recipe list HERE
    // will be modified. We don't want that.

    return this.recipes.slice();

    // Doing this instead will provide us with a copy, so the original is not modifiable by the component

  }

  getRecipe(index: number) {
    return this.recipes.slice()[index]
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesUpdated.next(this.recipes.slice())
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesUpdated.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesUpdated.next(this.recipes.slice())
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
    console.log("adding to the SL service...")
  }

}
