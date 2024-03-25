import { Component, OnInit } from '@angular/core';
import { CreedentialsService } from '../../services/creedentials.service';
import { User } from '../../interfaces/user.interface';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  
  public getUser: User = {
    user: '',
    password: ''
  };
  public localUser: User[] = [];

  constructor( private creedentialService: CreedentialsService){}

  ngOnInit(): void {
    this.creedentialService.getUserCredentials().subscribe(
      users => {
        this.getUser = users;
        console.log(this.getUser);
      }
    );
  }

  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })


  onSubmit(){
    console.log(this.form.value);
    if(this.form.value.username === this.getUser.user && this.form.value.password === this.getUser.password){
      return console.log("Credenciales incorrectas");
      
    } else {
       console.log("te logeaste correctamente");
      
    }
  }

  
}
