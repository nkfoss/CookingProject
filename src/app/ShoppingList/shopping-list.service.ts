import { Ingredient } from "../shared/ingredient.model"
import { Subject } from 'rxjs'

export class ShoppingListService {

    ingredientsUpdated = new Subject<Ingredient[]>(); // For use with the shopping-list comp.

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 'whole', 5),
        new Ingredient('Tomatoes', 'whole', 10),
      ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);                    // Update ingredient list
        this.ingredientsUpdated.next( this.getIngredients() ) // Send out an update
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);                // Update ingredient list
        this.ingredientsUpdated.next( this.getIngredients() ) // Send out the update
    }
}
