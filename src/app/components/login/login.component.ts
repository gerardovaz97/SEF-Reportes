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
export class LoginComponent implements OnInit{

  //* Parametro local donde almacena los usuarios que son consumidos del API por el service
  public getUser: User[] = [];

  constructor( 
    private creedentialService: CreedentialsService,
    private router: Router,
    ){}

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
  onSubmit(){
    this.getUser.forEach(user => {
      this.validation(user);
    })
  }

  //* Funcion que ejecuta un recorrido de todos los usuarios de la API contra las credenciales ingresadas por el usuario
  validation(user: User){
    if(this.form.value.username === user.user && this.form.value.password === user.password){
      this.validationUser = true;
      this.router.navigate(['reportes'])
      return console.log("Credenciales Correctas");
    } else {
      this.validationUser = false;
    }
  }


  
}
