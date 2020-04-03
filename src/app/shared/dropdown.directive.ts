import { Directive, HostBinding, ElementRef,  HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

<<<<<<< Updated upstream
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  // Basically, this says if you click anywhere else in the document to change the focus, then it closes.
  // @HostListener('focusout') focusout() {
  //   this.openStatus = false;
  // }
=======
  @HostBinding('class.open') openStatus = false;

  @HostListener('click') click(eventData: Event) {
    this.openStatus = !this.openStatus;
  }

  // Basically, this says if you click anywhere else in the document to change the focus, then it closes.
  @HostListener('focusout') focusout() {
    this.openStatus = false;
  }
>>>>>>> Stashed changes
  constructor(private elRef: ElementRef) {}

}
