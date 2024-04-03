import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'shared-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit{

  @Input() public placeholder: string = "";
  @Input() public type: string = "";
  @Input() public id: string = "";
  @Input() public formControl!: FormControl;
  @Input() public formSubmitted?: boolean;
  @Output() public value = new EventEmitter<string>();

  ngOnInit(): void {
  }

  //* Funcion de cambio a la visualizacion 
  changeType(): void{
    (this.type === 'password')? this.type = 'text': this.type = 'password';
  }

}
