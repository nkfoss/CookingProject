import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

// ==============================================================

export class ShoppingListComponent implements OnInit, OnDestroy {

  private ingUpdateSub: Subscription; // Our subscription to ingredient updates
  ingredients: Ingredient[]; // The shopping list's personal list of ingredients to buy

  // ==============================================================

  constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {

      // First, get the most current ingredients from the slService. Then subscribe.
      this.ingredients = this.shoppingListService.getIngredients();
      this.ingUpdateSub = this.shoppingListService.ingredientsUpdated.subscribe(
        (updatedIngredients: Ingredient[]) => {
          this.ingredients = updatedIngredients;
          console.log("Ingredients updated!")
        }
      )
    }

    ngOnDestroy() {
      this.ingUpdateSub.unsubscribe();
    }


}
