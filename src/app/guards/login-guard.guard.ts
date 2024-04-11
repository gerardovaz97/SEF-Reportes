import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAuthService } from '../services/LoginAuth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export const loginGuard = (jwtHelper: JwtHelperService) => {
  const token = localStorage.getItem('token');
  
  if(token){
    return true;
  }
  else{
    return inject(Router).createUrlTree(['/login']);
  }
};
