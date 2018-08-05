import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxUploaderModule } from 'ngx-uploader';
import { LoginComponent } from '@app/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AuthService } from '@app/Services/auth.service';
import { RestangularModule, Restangular } from 'ngx-restangular';
import {
  RESTANGULAR_AUTH,
  RestangularAuthFactory,
  RestangularConfigFactory,
  RESTANGULAR_NOT_AUTH,
  RestangularNotAuthFactory
} from '@app/restangular.config';
import { SignupComponent } from '@app/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadFileComponent } from '@app/upload-file/upload-file.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HomeComponent } from '@app/home/home.component';
import { HeaderComponent } from '@app/header/header.component';

@NgModule({
  declarations: [AppComponent, SignupComponent, UploadFileComponent, LoginComponent, HomeComponent, HeaderComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RestangularModule.forRoot([AuthService], RestangularConfigFactory),
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    NgxUploaderModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: RESTANGULAR_AUTH,
      useFactory: RestangularAuthFactory,
      deps: [Restangular, AuthService]
    },
    {
      provide: RESTANGULAR_NOT_AUTH,
      useFactory: RestangularNotAuthFactory,
      deps: [Restangular]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
