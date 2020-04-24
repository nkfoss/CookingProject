import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

// ==============================================================

// This is the recipe details section. When you click on recipe in the list, this is what is displayed.
// You can also edit or delete the details. MOST IMPORTANT: You can add it to your shopping list.

export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  // ==============================================================

  constructor(private recipeService: RecipeService,
              private router: Router, 
              private activatedRoute : ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe (
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  //=================================================================

  onUpdateShoppingList() {
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute} )
  }

}
