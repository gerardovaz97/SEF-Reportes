import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit{

  //* Variables de Labels
  protected lblFormText: string = "Es necesario que primero establezcas tu contraseña, para que puedas acceder a tu cuenta";

  //* Inicializando FormGroup para el Login
  protected fFormGroup: FormGroup = new FormGroup({});

  //* Inyeccion de Servicios
  constructor( private formBuilder: FormBuilder){}

  //* Codigo que se inicializa junto al componente
  ngOnInit(): void {
    //? Conjunto de componentes del FormGroup con validaciones y almacenamiento de datos del form
    this.fFormGroup = this.formBuilder.group({
      newPassword: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required),
    })
  }
  password = {'newPassword': '', 'repeatPassword': ''}

  //* Controles del formulario
  public formSubmitted: boolean = false;
  getNewPassword(): any{ return this.fFormGroup.get('newPassword'); }
  getRepeatPassword(): any{ return this.fFormGroup.get('repeatPassword'); }
}
