import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const loginGuard = () => {
  const token = localStorage.getItem('token');

  if(token){
    return true;
  }
  else{
    return inject(Router).createUrlTree(['/login']);
  }
};
