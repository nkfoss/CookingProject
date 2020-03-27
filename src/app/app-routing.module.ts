import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { RecipesComponent } from './RecipeBook/recipes.component'
import { ShoppingListComponent } from './ShoppingList/shopping-list.component'
import { RecipeDetailComponent } from './RecipeBook/recipe-detail/recipe-detail.component'
import { EditRecipeComponent } from './RecipeBook/edit-recipe/edit-recipe.component'
import { EditShoppingListComponent } from './ShoppingList/edit-shopping-list/edit-shopping-list.component'
import { NotFoundComponent } from './not-found/not-found.component'

const appRoutes: Routes = [

    {path: '#', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent,
    children: [
        { path: ':name/details', component: RecipeDetailComponent},
        { path: ':name/edit', component: EditRecipeComponent} ]
    },

    { path: 'shopping-list', component: ShoppingListComponent,
    children: [
        { path: "edit", component: EditShoppingListComponent } ]
    },

    { path: 'not-found', component: NotFoundComponent},
    { path: '**', redirectTo: '/recipes'}
]

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {

}