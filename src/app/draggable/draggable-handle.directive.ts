import { Directive, Input, ElementRef, Inject, Optional } from '@angular/core';

@Directive({
  selector: '[appDraggableHandle]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'draggable handle'
  },
  exportAs: 'appDraggableHandle'
})
export class DraggableHandleDirective {

  @Input('dragHandleDisabled')
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = value;
  }
  private _disabled = false;

  constructor(
    public element: ElementRef<HTMLElement>) { }

}
