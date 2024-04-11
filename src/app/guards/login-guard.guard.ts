import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CreedentialsService } from '../services/creedentials.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export const loginGuard = () => {
  const token = localStorage.getItem('token');

  if(token){
    return true;
  }
  else{
    return inject(Router).createUrlTree(['/login']);
  }
};
