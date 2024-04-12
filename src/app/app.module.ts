import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';

import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { LoginComponent } from './components/login/login.component';
import { ModalComponent } from './shared/modal/modal.component';
import { InputComponent } from './shared/input/input.component';
import { ImageComponent } from './shared/image/image.component';
import { ChangepassComponent } from './components/changepass/changepass.component';
import { ReportesPageComponent } from './pages/reportes-page/reportes-page.component';
import { SEFReportesRoutingModule } from './pages/reportes-routing.module';
import { ReporteMensualComponent } from './components/reporte-mensual/reporte-mensual.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SidebarComponent,
    ReportesComponent,
    LoginComponent,
    ModalComponent,
    InputComponent,
    ImageComponent,
    ChangepassComponent,
    ReportesPageComponent,
    ReporteMensualComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    SEFReportesRoutingModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
