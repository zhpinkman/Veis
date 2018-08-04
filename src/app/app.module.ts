import { AuthGuard } from '@app/Services/authguard';
import { LoginComponent } from '@app/login/login.component';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "@app/app-routing.module";
import { AppComponent } from "@app/app.component";
import { AuthService } from "@app/Services/auth.service";
import { RestangularModule, Restangular } from "ngx-restangular";
import {
  RESTANGULAR_AUTH,
  RestangularAuthFactory,
  RestangularConfigFactory
} from "@app/restangular.config";
import { SignupComponent } from "@app/signup/signup.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UploadFileComponent } from "@app/upload-file/upload-file.component";
import { SimpleNotificationsModule } from "angular2-notifications";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


@NgModule({
  declarations: [AppComponent, SignupComponent, UploadFileComponent, LoginComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RestangularModule.forRoot([AuthService], RestangularConfigFactory),
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    AuthGuard,
    {
      provide: RESTANGULAR_AUTH,
      useFactory: RestangularAuthFactory,
      deps: [Restangular, AuthService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
