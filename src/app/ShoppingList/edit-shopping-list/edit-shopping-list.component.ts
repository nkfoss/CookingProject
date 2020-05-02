import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-shopping-list',
  templateUrl: './edit-shopping-list.component.html',
  styleUrls: ['./edit-shopping-list.component.css']
})

// ==============================================================

export class EditShoppingListComponent implements OnInit, OnDestroy {

  @ViewChild('ingredientForm', { static: false }) ingredientForm: NgForm;
  editingSubscription: Subscription;
  editedItemIndex: number;
  editedItem: Ingredient;

  // Originally, its assumed you're not updating ingredients.
  // When the editingSubscription gets an update (ie: when you select an ingredient
  // in the list), then editMode becomes true.
  editMode = false;

  //=========================================================================

  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnInit() {
    // This subscription receives the index of the shopping list item to be edited
    this.editingSubscription = this.shoppinglistService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppinglistService.getIngredient(index);

        this.ingredientForm.setValue({  // Now fill the form with the selected ingredient
          itemName: this.editedItem.name,
          amount: this.editedItem.amount,
          unit: this.editedItem.unit
        })
      }
    );
  }

  ngOnDestroy() {
    this.editingSubscription.unsubscribe();
  }

  //==============================================================================  

  // This function both Adds and updates existing ingredients
  onAddIngredient() {

    // Get form information and create new ingredient object
    const ingName = this.ingredientForm.value.itemName;
    const ingAmount = this.ingredientForm.value.amount;
    const ingUnit = this.ingredientForm.value.unit;
    const newIngredient = new Ingredient(ingName, ingUnit, ingAmount);

    // If updating, replace the old ingredient.
    if (this.editMode) {
      this.shoppinglistService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppinglistService.addIngredient(newIngredient) // Otherwise append the new ingredient
    }

    this.onClear(); // Always 'clear' and reset editMode when finished

    // ~~Alternative way to reset the fields~~ (I know I'm not supposed to access the elements directly like this)
    // this.nameInputRef.nativeElement.value = "";
    // this.amountInputRef.nativeElement.value = "";
  }

  // This both clears the form...
  // ...and sets editmode = false (so we can back out of editing an existing item).
  onClear() {
    this.editMode = false;
    this.ingredientForm.reset();
  }

  onDeleteIngredient() {
     this.shoppinglistService.deleteIngredient(this.editedItemIndex);
     this.onClear()
  }





}
