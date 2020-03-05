import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipePassedUp = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Homemade chicken breast', 'mmmm yum',
    'https://www.spendwithpennies.com/wp-content/uploads/2018/08/SpendWithPennies-Oven-Baked-Chicken-Breast-22.jpg'),
    new Recipe('Coconut curry lentils', 'Spicy bois',
    'https://minimalistbaker.com/wp-content/uploads/2017/09/AMAZING-Coconut-Curried-Golden-Lentils-20-minutes-healthy-SO-satisfying-vegan-lentil-curry-plantbased-coconut-dairyfree-glutenfree-11.jpg'),
  ];

  onRecipeSelected(recipe: Recipe) {
    this.recipePassedUp.emit(recipe)
  }

  constructor() { }

  ngOnInit() {
  }

}
