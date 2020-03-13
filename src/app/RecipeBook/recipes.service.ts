import { Recipe } from './recipe.model'
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../ShoppingList/shopping-list.service';

@Injectable()

export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Homemade chicken breast', 'mmmm yum',
    'https://www.spendwithpennies.com/wp-content/uploads/2018/08/SpendWithPennies-Oven-Baked-Chicken-Breast-22.jpg',
    [
      new Ingredient('chicken breast', 'whole breast', 3),
      new Ingredient('rosemary', 'sprig', 3),
      new Ingredient('EVOO', 'tbsp', 2),
      new Ingredient('salt', 'tsp', 1),
      new Ingredient('pepper', 'tsp', 3)
    ]),
    new Recipe('Coconut curry lentils', 'Spicy bois',
    'https://minimalistbaker.com/wp-content/uploads/2017/09/AMAZING-Coconut-Curried-Golden-Lentils-20-minutes-healthy-SO-satisfying-vegan-lentil-curry-plantbased-coconut-dairyfree-glutenfree-11.jpg',
    [
      new Ingredient('golden lentils', 'cups', 1.5),
      new Ingredient('water', 'cups', 4),
      new Ingredient('coconut oil', 'tbsp', 1),
      new Ingredient('shallot', 'small, diced', 1),
      new Ingredient('garlic', 'clove (diced)', 4),
      new Ingredient('ginger', 'tbsp', 3),
      new Ingredient('salt', 'tsp', 0.75),
      new Ingredient('curry powder', 'tsp', 1),
      new Ingredient('ground turmeric', 'tsp', 1),
      new Ingredient('cayenne pepper', 'tsp', 1/8),
      new Ingredient('coconut milk (light)', 'cup', 1.5),
      new Ingredient('lemon juice (fresh)', 'tbsp', 2)
    ])
  ];

  // ===========================================================================================================================

  getRecipes() {

    // return this.recipes;

    // We don't implement it this way, because arrays are 'reference-types' in JS.
    // That means if another component gets this recipe list, and edits it, then the recipe list HERE
    // will be modified. We don't want that.

    return this.recipes.slice();

    // Doing this instead will provide us with a copy, so the original is not modifiable by the component

  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
    console.log("attempted to pass ingredients")
  }

  constructor(private shoppingListService: ShoppingListService) {

  }

}
