import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  
  constructor(public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    if(localStorage.getItem('token')){
      const token = localStorage.getItem('token');
      return !this.jwtHelper.isTokenExpired(token);
    }
    else{
      return false;
    }
  }
}
