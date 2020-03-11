import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipePassedUp = new EventEmitter<Recipe>();

  recipes: Recipe[];

  // ==============================================================

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  // ==============================================================

  onRecipeSelected(recipe: Recipe) {
      this.recipePassedUp.emit(recipe)
    }

}
