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
  protected aFormGroup: FormGroup = new FormGroup({});


  //* Inyeccion de Servicios
  constructor(private formBuilder: FormBuilder) { }

  //* Codigo que se inicializa junto al componente
  ngOnInit(): void {
    //? Conjunto de componentes del FormGroup con validaciones y almacenamiento de datos del form
    this.aFormGroup = this.formBuilder.group({
      newpass: new FormControl('', Validators.required),
      repeatpass: new FormControl('', Validators.required),
    })
  }

  //* Controles del formulario
  public formSubmitted: boolean = false;
  getNewPass(): any{ return this.aFormGroup.get('newpass') as FormControl; }
  getRepeatPass(): any{ return this.aFormGroup.get('repeatpass') as FormControl; }

  onSubmit() {
    const { newpass, repeatpass } = this.aFormGroup.value;
    this.formSubmitted = true;
    this.newPasswordValidation(newpass, repeatpass);
    console.log(newpass, repeatpass);
    
  }
  //* Variable de validacion de credenciales y formulario
  inputError: string = "";

  newPasswordValidation(newPassword: string, repeatPassword: string): void {
    console.log();
    //! FUNCIONALIDAD DE CAMBIO DE CONTRASEÑA
    this.inputError = "NULL";
  }
}
