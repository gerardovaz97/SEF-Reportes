import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
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
import { ChangePasswordComponent } from './components/change-password/change-password.component';


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
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
