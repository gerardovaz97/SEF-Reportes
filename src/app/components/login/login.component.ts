import { Component, OnInit, ViewChild } from '@angular/core';
import { CreedentialsService } from '../../services/creedentials.service';
import { User } from '../../interfaces/user.interface';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptcha2Component } from 'ngx-captcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  //* Parametro local donde almacena los usuarios que son consumidos del API por el service (ELIMINAR)
  public getUsers: any = []

  //* Key de Recaptcha
  @ViewChild('captchaElement') recaptcha!: ReCaptcha2Component;
  public siteKey: string = "6LdQPKspAAAAAGxXtYbCOdaWW-RYC_VAQ4vCSk7_";

  //* Inicializando FormGroup para el Login
  aFormGroup!: FormGroup;

  //* Inyeccion de servicios
  constructor(
    private creedentialService: CreedentialsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  //* Codigo que se inicializa junto al componente
  ngOnInit(): void {
    //? Llamado a la creacion del form (new code)
    this.createForm();

    // this.creedentialService.getUsers2Request().subscribe(
    //   usuarios => {
    //     this.getUsers = usuarios;
    //    console.log(usuarios);
       
    //   })
    
  }
  //* Funcion de creacion de Formulario (new code)
  createForm(){
    this.aFormGroup = this.formBuilder.group({
      usr_name: new FormControl('', Validators.required),
      usr_password: new FormControl('', Validators.required),
      recaptcha: ['', Validators.required]
    })
  }

  public formSubmitted: boolean = false;

  //* Funcion que se ejecuta cuando el evento Submit del Form (form) es ejecutado
  onSubmit( form: any ) {
    // const {usr_name, usr_password} = this.aFormGroup.value;
    // console.log(this.aFormGroup.value);
    // console.log(usr_name, usr_password);
    
    
    //? Recepción de la Data del Formulario
    // const usr_name = form.usr_name;
    // const usr_password = form.usr_password;
    
    //? Activacion de validadores del Submit
    this.formSubmitted = true;

    //? Envio de Formulario Validador de Credenciales
    this.creedentialsInputValidation(form);
  }

  //* Variable de validacion de credenciales y formulario
  inputError: string = "";

  creedentialsInputValidation(form: any): void{
    this.creedentialService.postUserCredentials(form).subscribe(
      user => {
        console.log(user[0].usr_nombre);
      }
    )
  }
}