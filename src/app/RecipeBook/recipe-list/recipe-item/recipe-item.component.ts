import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
<<<<<<< Updated upstream
  @Input() index: number;

=======

  onSelect(recipeName: string) {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
>>>>>>> Stashed changes

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

}
