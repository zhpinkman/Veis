import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxUploaderModule } from 'ngx-uploader';
import { LoginComponent } from '@app/login/login.component';
import { BrowserModule, Title } from '@angular/platform-browser';
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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UploadFileComponent } from '@app/upload-file/upload-file.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from '@app/home/home.component';
import { HeaderComponent } from '@app/header/header.component';
import { CompactFileComponent } from './compact-file/compact-file.component';
import { FullFileComponent } from './full-file/full-file.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FilesListComponent } from './files-list/files-list.component';
import { UploadItemComponent } from './upload-item/upload-item.component';
import {
  MatProgressBarModule,
  MatFormFieldModule,
  MatCheckboxModule
} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { SizePipe } from './size.pipe';
import { MatInputModule } from '@angular/material/input';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    UploadFileComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    CompactFileComponent,
    FullFileComponent,
    FilesListComponent,
    UploadItemComponent,
    SizePipe,
    ToolbarComponent
  ],

  imports: [
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RestangularModule.forRoot([AuthService], RestangularConfigFactory),
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    NgxUploaderModule,
    FontAwesomeModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule
  ],
  entryComponents: [FullFileComponent],
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
    },
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
