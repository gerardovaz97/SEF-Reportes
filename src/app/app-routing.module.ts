import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ChangepassComponent } from './components/changepass/changepass.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reportes', 
    loadChildren: ()=> import('./pages/reportes-routing.module').then(m => m.SEFReportesRoutingModule),
  },
  {
    path: 'changepass',
    component: ChangepassComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
