import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './Services/auth.service';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RESTANGULAR_AUTH, RestangularAuthFactory, RestangularConfigFactory } from './restangular.config';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadFileComponent } from './upload-file/upload-file.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    UploadFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RestangularModule.forRoot([AuthService],RestangularConfigFactory)
  ],
  providers: [
    { provide: RESTANGULAR_AUTH, useFactory:  RestangularAuthFactory, deps: [Restangular] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
