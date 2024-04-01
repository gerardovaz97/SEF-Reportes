import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'shared-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

  @Input() public placeholder: string = "";
  @Input() public type: string = "";
  @Input() public id: string = "";
  @Output() public value = new EventEmitter<string>();
  @Input() public formControl!: FormControl;


}
