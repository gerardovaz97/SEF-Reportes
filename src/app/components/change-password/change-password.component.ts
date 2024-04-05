import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {

  //* Variables de Labels
  protected lblFormText: string = "Es necesario que primero establezcas tu contraseña, para que puedas acceder a tu cuenta";

  //* Inicializando FormGroup para el Form
  protected fFormGroup: FormGroup = new FormGroup({});

  //* Inyeccion de Servicios
  constructor(private formBuilder: FormBuilder) { }

  //* Codigo que se inicializa junto al componente
  ngOnInit(): void {
    //? Conjunto de componentes del FormGroup con validaciones y almacenamiento de datos del form
    this.fFormGroup = this.formBuilder.group({
      newPassword: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required),
    })
    // Asignar los controles obtenidos a las propiedades
    this.newPasswordControl = this.getNewPassword();
    this.repeatPasswordControl = this.getRepeatPassword();
  }

  //* Controles del formulario
  public formSubmitted: boolean = false;

  newPasswordControl!: FormControl;
  repeatPasswordControl!: FormControl;
  getNewPassword():any{return this.fFormGroup.get('newPassword') as FormControl; }
  getRepeatPassword():any{return this.fFormGroup.get('repeatPassword') as FormControl; }
  // getNewPassword(): FormControl {
  //   return this.fFormGroup.get('newPassword') as FormControl;
  // }

  // getRepeatPassword(): FormControl {
  //   return this.fFormGroup.get('repeatPassword') as FormControl;
  // }

  onSubmit() {
    const { newPassword, repeatPassword } = this.fFormGroup.value;
    this.formSubmitted = true;
    this.newPasswordValidation(newPassword, repeatPassword);
  }
  //* Variable de validacion de credenciales y formulario
  inputError: string = "";

  newPasswordValidation(newPassword: string, repeatPassword: string): void {
    console.log();
    //! FUNCIONALIDAD DE CAMBIO DE CONTRASEÑA
    this.inputError = "NULL";
  }
}
