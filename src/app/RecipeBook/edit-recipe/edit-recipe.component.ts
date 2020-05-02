import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms'
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})

// ==============================================================

export class EditRecipeComponent implements OnInit {

  recipeForm: FormGroup;
  id: number;
  editMode = false; // Inititally assume we are creating a new recipe
  // OnInit, we subscribe to the route params.
  // If there is an 'id' in the params, then the recipe is NOT new, and we are in editMode
  // Else, the recipe is new and we are NOT in editMode.

  // ==============================================================

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  };

  // ==============================================================

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription)
    })
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

}
