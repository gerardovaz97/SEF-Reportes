import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl} from '@angular/forms';

@Component({
  selector: 'shared-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent{

  //* FormControl del Input (obligatoria para funcionalidad de form)
  @Input() control!: FormControl;
  //* Id del Input (obligatoria para funcionalidad de placeholder)
  @Input() id: string = '';
  //* Label del Input (opcional para texto del placeholder)
  @Input() label: string = '';
  //* Type del Input (obligatoria para definir el type del input)
  @Input() type: string = 'text';
  //* Placeholder del Input (opcional por implementacion de floating label)
  @Input() placeholder: string = '';
  //* Required del Control (opcional segun la validacion del form)
  @Input() required: boolean = false;
  //* ReadOnly del Input (opcional segun se requiera)
  @Input() readOnly: boolean = false;
  //* FormSubmitted flag (obligatoria para validaciones hasta que el form sea enviado)
  @Input() formSubmitted: boolean = false;
  //* SpecialInput (opcional segun el tipo de input y funcionalidades extras requieran)
  @Input() specialInput: string = '';
  //* MessageError (opcional para muestra de mensajes de error bajo el Input)
  @Input() messageError: string = "";

  //! POSIBLEMENTE ELIMINAR POR FALTA DE USO
  displayErrors(){
    const {dirty, touched, errors} = this.control;
    return dirty && touched && errors;
  }

  //* Funcion de cambio a la visualizacion (input type: password)
  changeType(): void{
    (this.type === 'password')? this.type = 'text': this.type = 'password';
  }

}
