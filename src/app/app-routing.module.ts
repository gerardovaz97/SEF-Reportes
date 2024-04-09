import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ChangepassComponent } from './components/changepass/changepass.component';
import { rutas } from './pages/reportes-routing.module';
import { ReportesPageComponent } from './pages/reportes-page/reportes-page.component';

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
    children: rutas,
    component: ReportesPageComponent,
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
