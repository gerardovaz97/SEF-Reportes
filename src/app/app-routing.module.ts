import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ChangepassComponent } from './components/changepass/changepass.component';
import { rutas } from './pages/reportes-routing.module';
import { ReportesPageComponent } from './pages/reportes-page/reportes-page.component';
import { loginGuard } from './guards/login-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reportes', 
    children: rutas,
    component: ReportesPageComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'changepass',
    component: ChangepassComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
