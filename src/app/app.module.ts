import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './Services/auth.service';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RESTANGULAR_AUTH, RestangularAuthFactory, RestangularConfigFactory } from './restangular.config';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {
  RESTANGULAR_AUTH,
  RestangularAuthFactory,
  RestangularConfigFactory
} from "./restangular.config";
import { UploadFileComponent } from "./upload-file/upload-file.component";
import { SimpleNotificationsModule } from "angular2-notifications";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent, UploadFileComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RestangularModule.forRoot([AuthService], RestangularConfigFactory),
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    {
      provide: RESTANGULAR_AUTH,
      useFactory: RestangularAuthFactory,
      deps: [Restangular]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
