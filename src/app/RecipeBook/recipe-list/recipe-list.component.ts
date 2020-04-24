import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

// ==============================================================

export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  // ==============================================================

  constructor(private recipeService: RecipeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  // ==============================================================

  onNewRecipe() {
    // This function just adds 'new' to our CURRENT route (hence the use of 'relativeTo')
    this.router.navigate(['new'], {relativeTo: this.activatedRoute} )
  }

}
