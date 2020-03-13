import { Directive, HostBinding, ElementRef,  HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') openStatus = false;

  @HostListener('click') click(eventData: Event) {
    this.openStatus = !this.openStatus;
  }

  // Basically, this says if you click anywhere else in the document to change the focus, then it closes.
  @HostListener('focusout') focusout() {
    this.openStatus = false;
  }
  constructor(private elRef: ElementRef) {}

}
