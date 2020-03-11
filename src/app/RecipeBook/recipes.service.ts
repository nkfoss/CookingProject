import { Recipe } from './recipe.model'

export class RecipeService {

  recipes: Recipe[] = [
    new Recipe('Homemade chicken breast', 'mmmm yum',
    'https://www.spendwithpennies.com/wp-content/uploads/2018/08/SpendWithPennies-Oven-Baked-Chicken-Breast-22.jpg'),
    new Recipe('Coconut curry lentils', 'Spicy bois',
    'https://minimalistbaker.com/wp-content/uploads/2017/09/AMAZING-Coconut-Curried-Golden-Lentils-20-minutes-healthy-SO-satisfying-vegan-lentil-curry-plantbased-coconut-dairyfree-glutenfree-11.jpg'),
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

}
