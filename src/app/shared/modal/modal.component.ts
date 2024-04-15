import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';

const regexdui = /^[0-9]{8}-[0-9]$/;
const regexnit = /^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]$/;

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit{

  //* Parametro local donde se almacenaran los emails de los usuarios
  public getEmails: User[] = [];
  //* Listado de documentos para reestablecer contraseña
  documentList: string[] = ['DUI', 'NIT'];
  //* Documento seleccionado por el usuario que habilita opciones del input
  documentSeleted: string = "";

  //* Inicializando FormGroup para el Login
  mFormGroup!: FormGroup;

  //* Inyeccion de Servicios
  constructor( 
    private formBuilder: FormBuilder,
  ){}

  //* Codigo que se inicializa junto al componentes
  ngOnInit(): void {
    //? Se le asigna un valor por defecto para que el input no sea accesible desde el inicios
    this.documentSeleted = "DUI/NIT";

    //? Conjunto de componentes del FormGroup con validaciones y almacenamiento de datos del form
    this.createForm();
  }
  createForm(){
    this.mFormGroup = this.formBuilder.group({
      usr_email: new FormControl('', [Validators.required, Validators.email]),
      documentDUI: new FormControl('', [Validators.pattern(regexdui), Validators.minLength(9), Validators.maxLength(10)]),
      documentNIT: new FormControl('', [Validators.pattern(regexnit), Validators.minLength(14), Validators.maxLength(17)])
    })
  }
  //* Bandera detectora de onSubmit del form
  public formSubmitted: boolean = false;

  //* Funcion dinamica segun la seleccion del documento a ingresar al input
  onSelected(document: string){
    this.documentSeleted = document;
  }

  onSubmit(form: any):void{
    console.log(form);
    }

  //* Variable de validacion de credenciales y formulario
  public messageError: string = "";
}
