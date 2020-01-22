import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'More testing', 
    'https://22c7jb2gkpg027rwo01qkwj1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/wcvb-16-0018_hockeytownusa_circle-r_logo_color-2.png')
  ];

  constructor() { }

  ngOnInit() {
  }

}
