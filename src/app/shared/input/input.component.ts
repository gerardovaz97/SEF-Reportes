import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl} from '@angular/forms';

@Component({
  selector: 'shared-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit{

  // //* Placeholder de Inputs (opcional)
  // @Input() public placeholder?: string;
  // //* Type de Inputs (obligatorio)
  // @Input() public type: string = "";
  // //* Id de Inputs (obligatorio)
  // @Input() public id: string = "";
  // //* FormControl de Inputs (opcional)
  // @Input() public formControl!: FormControl;
  // //* FormSubmitted para form dinamicos (opcional)
  // @Input() public formSubmitted?: boolean;
  // //* SpecialInput para inputs con funciones especiales adicionales (opcional)
  // @Input() public specialInput?: string;
  // //* Value para la salida de datos al form (opcional)
  // @Output() public value = new EventEmitter<string>();

  //* FormControl del Input (obligatorio)
  @Input() control!: FormControl;
  @Input() id: string = '';
  //* Label del Input (opcional)
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() formSubmitted: boolean = false;

  ngOnInit(): void {}

  displayErrors(){
    const {dirty, touched, errors} = this.control;
    return dirty && touched && errors;
  }

  //* Funcion de cambio a la visualizacion (input type: password)
  changeType(): void{
    (this.type === 'password')? this.type = 'text': this.type = 'password';
  }

}
