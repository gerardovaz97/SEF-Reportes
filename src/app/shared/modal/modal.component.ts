import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

const regexdui = /^[0-9]{8}-[0-9]$/;
const regexnit = /^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]$/;

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit{

  //* Listado de documentos para reestablecer contraseña
  documentList: string[] = ['DUI', 'NIT'];

  //* Documento seleccionado por el usuario que habilita opciones del input
  documentSeleted: string = "";
  
  //* Codigo que se inicializa junto al componentes
  ngOnInit(): void {
    //* Se le asigna un valor por defecto para que el input no sea accesible desde el inicio
    console.log(this.documentList)
    this.documentSeleted = "DUI/NIT";
  }

  //* Funcion dinamica segun la seleccion del documento a ingresar al input
  onSelected(document: string){
    this.documentSeleted = document;

  }

  onSubmit():void{

  }

  //? Codigo de Validacion de Inputs
  emailInputValidation: boolean = false;
  documentInputValidation: boolean = false;

  inputsValidation(): void{
    
  }

}
