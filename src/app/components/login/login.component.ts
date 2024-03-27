import { Component, OnInit } from '@angular/core';
import { CreedentialsService } from '../../services/creedentials.service';
import { User } from '../../interfaces/user.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  //* Parametro local donde almacena los usuarios que son consumidos del API por el service
  public getUser: User[] = [];

  constructor(
    private creedentialService: CreedentialsService,
    private router: Router,
  ) { }

  //* Codigo que se inicializa junto al componente
  ngOnInit(): void {
    //* Subscripcion al Observable para que mande la peticion a la API y obtener todos los usuarios almacenados
    this.creedentialService.getUserCredentials().subscribe(
      users => {
        this.getUser = users;
        console.log(this.getUser);
      }
    );
  }

  //* Parametro que almacena la data ingresada por el usuario en el formulario (form)
  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  //* Parametro booleano de acceso de usuario
  public validationUser: boolean = false;

  //* Funcion que se ejecuta cuando el evento Submit del Form (form) es ejecutado
  onSubmit() {

    this.inputValidation();
    if(this.inputError !== "") return console.log(this.inputError);
    
    //? Codigo de busqueda del user
    const {username, password} = this.form.value;
    const usuario = this.getUser.filter( usuario => username === usuario.user);
    console.log(usuario);
    const usuarioAuth = usuario.filter(usuario => password === usuario.password)
    console.log(usuarioAuth);

    //? Codigo de validacion de existencia de las credenciales
    if(usuarioAuth.length > 0){
      this.router.navigate(['reportes'])
    }
    else{
      this.inputError = "Credenciales incorrectas";
      console.log("Usuario no encontrado");
    }
  }

  //? Codigo de Validacion de Inputs
  inputError: string = "";

  inputValidation(){
    const {username, password} = this.form.value;
    this.inputError = (username == "")? "Ingrese su usuario": "";
    if(this.inputError !== "") return;
    this.inputError = (password == "")? "Ingrese su contraseña": "";
  }

}
