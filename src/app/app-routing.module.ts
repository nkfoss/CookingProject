import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import { RecipesComponent } from './RecipeBook/recipes.component'
import { ShoppingListComponent } from './ShoppingList/shopping-list.component'
import { RecipeDetailComponent } from './RecipeBook/recipe-detail/recipe-detail.component'
import { EditRecipeComponent } from './RecipeBook/edit-recipe/edit-recipe.component'
import { EditShoppingListComponent } from './ShoppingList/edit-shopping-list/edit-shopping-list.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { RecipeStartComponent } from './RecipeBook/recipe-start/recipe-start.component'
import { RecipesResolverService } from './RecipeBook/recipes-resolver.service'
import { AuthComponent } from './auth/auth.component'
import { AuthGuard } from './auth/auth.guard'

// ==========================================================

const appRoutes: Routes = [

    {path: '#', redirectTo: '/recipes', pathMatch: 'full' },

    { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard],
    children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: EditRecipeComponent },
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
        { path: ':id/edit', component: EditRecipeComponent, resolve: [RecipesResolverService] }
    ]},

    // Also make sure dynamic parameters come after static paramter routes

    { path: 'shopping-list', component: ShoppingListComponent,
    children: [
        { path: "edit", component: EditShoppingListComponent } ]
    },

    { path: 'auth', component: AuthComponent},
    
    { path: 'not-found', component: NotFoundComponent},
    { path: '**', redirectTo: '/recipes'}
]

// ==========================================================

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes)],
    exports: [ RouterModule ]
})

// ==========================================================

export class AppRoutingModule {

}