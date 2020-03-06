import { Directive, HostBinding, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') openStatus = false;

  @HostListener('click') click(eventData: Event) {
    this.openStatus = !this.openStatus;
  }



}
