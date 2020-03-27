import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DropdownDirective } from './shared/dropdown.directive';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './ShoppingList/shopping-list.component';
import { EditShoppingListComponent } from './ShoppingList/edit-shopping-list/edit-shopping-list.component';
import { EditRecipeComponent} from './RecipeBook/edit-recipe/edit-recipe.component';
import { RecipeListComponent } from './RecipeBook/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './RecipeBook/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './RecipeBook/recipe-detail/recipe-detail.component';
import { HeaderComponent } from './Header/header.component';
import { RecipesComponent } from './RecipeBook/recipes.component';
import { ShoppingListService } from './ShoppingList/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    EditShoppingListComponent,
    EditRecipeComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesComponent,
    NotFoundComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
