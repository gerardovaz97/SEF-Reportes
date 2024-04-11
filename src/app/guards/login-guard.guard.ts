import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAuthService } from '../services/LoginAuth.service';


export const loginGuard = (loginAuthService: LoginAuthService) => {

  
  if(loginAuthService.isAuthenticated()){
    return true;
  }
  else{
    return inject(Router).createUrlTree(['/login']);
  }
};
