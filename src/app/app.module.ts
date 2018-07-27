import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './Services/auth.service';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RESTANGULAR_AUTH, RestangularAuthFactory, RestangularConfigFactory } from './restangular.config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RestangularModule.forRoot([AuthService],RestangularConfigFactory)
  ],
  providers: [
    { provide: RESTANGULAR_AUTH, useFactory:  RestangularAuthFactory, deps: [Restangular] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
