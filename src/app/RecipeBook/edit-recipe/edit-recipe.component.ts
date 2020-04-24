import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})

// ==============================================================

export class EditRecipeComponent implements OnInit {

  id: number;
  editMode = false; // Inititally assume we are creating a new recipe
  // OnInit, we subscribe to the route params.
  // If there is an 'id' in the params, then the recipe is NOT new, and we are in editMode
  // Else, the recipe is new and we are NOT in editMode.

  // ==============================================================

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          console.log(this.editMode)
      }
    )};

}
