import { Component, OnInit } from '@angular/core';
import { CreedentialsService } from '../../services/creedentials.service';
import { User } from '../../interfaces/user.interface';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  //* Parametro local donde almacena los usuarios que son consumidos del API por el service
  public getUser: User[] = [];

  //* Inicializando FormGroup para el Login
  protected aFormGroup: FormGroup = new FormGroup({});

  //* Key de Recaptcha
  public siteKey: string = "6LdQPKspAAAAAGxXtYbCOdaWW-RYC_VAQ4vCSk7_";

  //* Inyeccion de servicios
  constructor(
    private creedentialService: CreedentialsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  //* Codigo que se inicializa junto al componente
  ngOnInit(): void {
    //? Conjunto de componentes del FormGroup con validaciones y almacenamiento de datos del form
    this.aFormGroup = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      recaptcha: ['', Validators.required]
    })

    //? Subscripcion al Observable para que mande la peticion a la API y obtener todos los usuarios almacenados
    this.creedentialService.getUserCredentials().subscribe(
      users => {
        this.getUser = users;
        console.log(this.getUser);
      }
    );
  }

  getUsername(): any{
    return this.aFormGroup.get('username');
  }
  getPassword(): any{
    return this.aFormGroup.get('password');
  }

  //* Parametro booleano de acceso de usuario
  public validationUser: boolean = false;

  //* Funcion que se ejecuta cuando el evento Submit del Form (form) es ejecutado
  onSubmit() {

    //? Codigo de busqueda y validacion de credenciales
    const { username, password } = this.aFormGroup.value;

    console.log(username);
    this.creedentialsInputValidation(username,password);
    console.log(this.aFormGroup.status);
  }

  //* Variable de validacion de credenciales
  inputError: string = "";

  creedentialsInputValidation(username: string, password: string): void{
    const userAuth = this.getUser.filter( _creedentials => username === _creedentials.user);
    const passAuth = userAuth.filter(_creedentials => password === _creedentials.password);

    if (passAuth.length == 1 && this.aFormGroup.status == 'VALID') {
      this.router.navigate(['reportes'])
    }
    else {
      this.inputError = "Credenciales incorrectas";
      console.log("Usuario no encontrado");
    }
  }
}