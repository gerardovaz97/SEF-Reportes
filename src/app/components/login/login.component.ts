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

  
  public getUser: User[] = [];

  constructor( 
    private creedentialService: CreedentialsService,
    private router: Router,
    ){}

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

  public validationUser: boolean = false;

  validation(user: User){
    if(this.form.value.username === user.user && this.form.value.password === user.password){
      this.validationUser = true;
      this.router.navigate(['reportes'])
      return console.log("Credenciales Correctas");
    } else {
      this.validationUser = false;
    }
  }


  onSubmit(){
    this.getUser.forEach(user => {
      this.validation(user);
    })
  }
  
}
