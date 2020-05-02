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
  editMode = false;
  
  //=========================================================================

  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnInit() {
    this.editingSubscription = this.shoppinglistService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppinglistService.getIngredient(index);
        this.ingredientForm.setValue({
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

  onAddIngredient() {
    console.log(this.ingredientForm)

    const ingName = this.ingredientForm.value.itemName;
    const ingAmount = this.ingredientForm.value.amount;
    const ingUnit = this.ingredientForm.value.unit;
    const newIngredient = new Ingredient(ingName, ingUnit, ingAmount);
    this.shoppinglistService.addIngredient(newIngredient)

    this.ingredientForm.reset();

    // ~~OLD~~
    // Now reset the fields. (I know I'm not supposed to access the elements directly like this)
    // this.nameInputRef.nativeElement.value = "";
    // this.amountInputRef.nativeElement.value = "";
  }





}
