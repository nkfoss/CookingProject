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
