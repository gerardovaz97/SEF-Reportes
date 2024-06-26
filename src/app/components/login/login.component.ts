import { Component, OnInit, ViewChild } from '@angular/core';
import { CreedentialsService } from '../../services/creedentials.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptcha2Component } from 'ngx-captcha';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  //* Parametro local donde almacena los usuarios que son consumidos del API por el service
  //!: CAMBIAR DE ANY A UNA INTERFAZ DE TIPO USUARIO CUANDO SE SEPA QUE DATOS OCUPAR
  public getUsers: any = []

  //* Key de Recaptcha
  @ViewChild('captchaElemen') captchaElemen!: ReCaptcha2Component;
  public siteKey: string | undefined;

  //* Inicializando FormGroup para el Login
  aFormGroup!: FormGroup;

  //* Inicializando bandera de Loading Spinner
  public isLoading: boolean = false;

  //* Inyeccion de servicios
  constructor(
    private creedentialService: CreedentialsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.siteKey = environment.siteKey;
  }

  //* Codigo que se inicializa junto al componente
  ngOnInit(): void {
    //? Llamado a la creacion del form
    this.createForm();
  }
  //* Funcion de creacion de Formulario
  createForm(){
    this.aFormGroup = this.formBuilder.group({
      usr_name: new FormControl('', Validators.required),
      usr_password: new FormControl('', Validators.required),
      captchaElemen: ['', Validators.required]
    })
  }
  //* Reset del Captcha al onSubmit
  captchaReset(){ this.captchaElemen.resetCaptcha();}
  //* Bandera detectora de onSubmit del form
  public formSubmitted: boolean = false;

  //* Funcion que se ejecuta cuando el evento Submit del Form (form) es ejecutado
  onSubmit( form: any ) {
    //? Activacion del LoadingSpinner
    this.isLoading = true;
    //? Activacion de validadores del Submit
    this.formSubmitted = true;
    //? Envio de Formulario Validador de Credenciales
    this.creedentialsInputValidation(form);

  }

  //* Variable de validacion de credenciales y formulario
  //? VERIFICAR LUEGO
  public messageError: string = "";

  creedentialsInputValidation(form: any): any{
    //? Subscripcion al CredentialsService (API)
    this.creedentialService.postUserCredentials(form).subscribe(
      user => {
        //? Desactivar LoadingSpinner
        this.isLoading = false;
        //? Verificando si la respuesta contiene mensaje de error sobre la peticion
        if(user.msg){
          //? Reset del Captcha
          this.aFormGroup.reset();
          this.captchaReset();
          this.messageError = user.msg;
          return;
        }
        this.creedentialService.saveToken(user.usr_jwt);
        this.router.navigate(['reportes']);
      }
    )
  }
}