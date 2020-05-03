import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms'
import { RecipeService } from '../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})

// ==============================================================

export class EditRecipeComponent implements OnInit {

  recipeForm: FormGroup;
  recipeId: number;
  editMode = false; // Inititally assume we are creating a new recipe
  // OnInit, we subscribe to the route params.
  // If there is an 'id' in the params, then the recipe is NOT new, and we are in editMode
  // Else, the recipe is new and we are NOT in editMode.

  // ==============================================================

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.recipeId = +params['id'];
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
      const recipe = this.recipeService.getRecipe(this.recipeId);
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
    // This is not necessary since our form has the same structure as a recipe object
    // const recipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // )
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeId, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.router.navigate(['../'], {relativeTo: this.activatedRoute})
  }

  onAddIngredient() {
    (<FormArray> this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount' : new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/) ])
      })
    )
  }

  onDeleteIngredient(index: number) {
    ( <FormArray> this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() { this.router.navigate(['../'], {relativeTo: this.activatedRoute}) }

  get controls() {
    return (<FormArray> this.recipeForm.get('ingredients')).controls;
  }

}
