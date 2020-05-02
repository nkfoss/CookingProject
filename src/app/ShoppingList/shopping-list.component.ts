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

  private ingUpdateSub: Subscription;
  ingredients: Ingredient[];

// ==============================================================

  constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
      this.ingredients = this.shoppingListService.getIngredients();
      this.ingUpdateSub = this.shoppingListService.ingredientsUpdated.subscribe(
        (updatedIngredients: Ingredient[]) => {
          this.ingredients = updatedIngredients;
          console.log("Ingredients updated!")
        }
      )};

    ngOnDestroy() {
      this.ingUpdateSub.unsubscribe();
    }

    onEditItem(index: number) {
      this.shoppingListService.startedEditing.next(index);
    }

}
