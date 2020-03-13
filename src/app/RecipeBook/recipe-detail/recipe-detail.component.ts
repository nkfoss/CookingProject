import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/ShoppingList/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

// This is the recipe details section. When you click on recipe in the list, this is what is displayed.
// You can also edit or delete the details. MOST IMPORTANT: You can add it to your shopping list.

export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  onUpdateShoppingList() {
    alert("maaa");
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }

  //=================================================================

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

}
