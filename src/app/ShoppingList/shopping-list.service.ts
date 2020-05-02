import { Subject } from 'rxjs'
import { Ingredient } from "../shared/ingredient.model"

// ==========================================================

export class ShoppingListService {

    ingredientsUpdated = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 'whole', 5),
        new Ingredient('Tomatoes', 'whole', 10),
      ];

      // ==========================================================

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsUpdated.next( this.getIngredients() )
    }

    addIngredients(ingredients: Ingredient[]) {
        // for (let ingredient of ingredients) {
        //     this.addIngredient(ingredient)
        // }

        // ^ Looping thru is okay, but can emit ALOT of events. Not necessary
        // Instead, we use the 'spread' method (denoted with three dots '...')
        // This turns the array into a list, and we can then push it properly.
        // If we try to push the array, it will get added as a single unit. Not good.

        this.ingredients.push(...ingredients);
        this.ingredientsUpdated.next( this.getIngredients() )
    }
    
}
