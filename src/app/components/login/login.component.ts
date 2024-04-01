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

  constructor(
    private creedentialService: CreedentialsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  //* Codigo que se inicializa junto al componente
  ngOnInit(): void {
    //? Parametro que almacena la data ingresada por el usuario en el formulario (form)
    this.aFormGroup = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl(''),
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

  //* Parametro booleano de acceso de usuario
  public validationUser: boolean = false;

  //* Funcion que se ejecuta cuando el evento Submit del Form (form) es ejecutado
  onSubmit() {
    //? Funcion de validacion de campos vacios
    this.nullInputValidation();
    if (this.inputError !== "") return console.log(this.inputError);

    //? Codigo de busqueda y validacion de credenciales
    const { username, password } = this.aFormGroup.value;
    this.creedentialsInputValidation(username,password);
  }

  //* Codigo de Validacion de Inputs
  inputError: string = "";

  nullInputValidation(): void {
    const { username, password } = this.aFormGroup.value;
    this.inputError = (username == "") ? "Ingrese su usuario" : "";
    if (this.inputError !== "") return;
    this.inputError = (password == "") ? "Ingrese su contraseña" : "";
  }

  creedentialsInputValidation(username: string, password: string): void{
    const userAuth = this.getUser.filter( _creedentials => username === _creedentials.user);
    const passAuth = userAuth.filter(_creedentials => password === _creedentials.password);

    if (passAuth.length == 1) {
      this.router.navigate(['reportes'])
    }
    else {
      this.inputError = "Credenciales incorrectas";
      console.log("Usuario no encontrado");
    }
  }

}
