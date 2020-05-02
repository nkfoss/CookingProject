import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms'
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
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      // Now check to see IF the recipe has any ingredients (it might not)
      // Then push a new form group (with two controls), per ingredient
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name, Validators.required),
              'amount' : new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/) ])
            }) 
          ) 
        } 
      }
    }  // END: editMode

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngredients //remember we already created this
    })
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onAddIngredient() {
    (<FormArray> this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount' : new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/) ])
      })
    )
  }

  get controls() {
    return (<FormArray> this.recipeForm.get('ingredients')).controls;
  }

}
