import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const loginGuard = () => {
  if(localStorage.getItem('token')){
    return true
  }
  else{
    return inject(Router).createUrlTree(['/login']);
  }
};
