import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'shared-changepass',
  templateUrl: './changepass.component.html',
  styleUrl: './changepass.component.scss'
})
export class ChangepassComponent implements OnInit{
  //* Variables de Labels
  protected lblFormText: string = "Es necesario que primero establezcas tu contraseña, para que puedas acceder a tu cuenta";

  //* Inicializando FormGroup para el Login
  nFormGroup!: FormGroup;


  //* Inyeccion de Servicios
  constructor(private formBuilder: FormBuilder) { }

  //* Codigo que se inicializa junto al componente
  ngOnInit(): void {
    //? Conjunto de componentes del FormGroup con validaciones y almacenamiento de datos del form
    this.createForm();
  }
  createForm(){
    this.nFormGroup = this.formBuilder.group({
      new_password: new FormControl('', Validators.required),
      repeat_password: new FormControl('', Validators.required),
    })
  }

  //* Controles del formulario
  public formSubmitted: boolean = false;

  onSubmit(form:any) {
    this.formSubmitted = true;
    this.newPasswordValidation(form); 
  }
  //* Variable de validacion de credenciales y formulario
  messageError: string = "";

  newPasswordValidation(form: any): void {
    //! FUNCIONALIDAD DE CAMBIO DE CONTRASEÑA
    this.messageError = "NULL";
  }
}
