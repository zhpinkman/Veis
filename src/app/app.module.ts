import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxUploaderModule } from 'ngx-uploader';
import { LoginComponent } from '@app/login/login.component';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AuthService } from '@app/Services/auth.service';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { HttpModule } from '@angular/http';
import { ProgressHttpModule } from 'angular-progress-http';
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
import { CompactFileComponent } from '@app/compact-file/compact-file.component';
import { FullFileComponent } from '@app/full-file/full-file.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FilesListComponent } from '@app/files-list/files-list.component';
import { UploadItemComponent } from '@app/upload-item/upload-item.component';
import {
  MatProgressBarModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatTooltipModule
} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { SizePipe } from '@app/size.pipe';
import { MatInputModule } from '@angular/material/input';
import { ToolbarComponent } from '@app/toolbar/toolbar.component';
import { RouteTestComponent } from '@app/route-test/route-test.component';
import { NewFolderComponent } from '@app/new-folder/new-folder.component';
import { FolderViewComponent } from './folder-view/folder-view.component';
import { UploadDropZoneComponent } from './upload-drop-zone/upload-drop-zone.component';
import { UploadToastPopupComponent } from './upload-toast-popup/upload-toast-popup.component';
import { OrderModule } from 'ngx-order-pipe';
import { DragulaModule } from 'ng2-dragula';
import { CopyCutPanelComponent } from './copy-cut-panel/copy-cut-panel.component';

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
    ToolbarComponent,
    RouteTestComponent,
    NewFolderComponent,
    FolderViewComponent,
    UploadDropZoneComponent,
    UploadToastPopupComponent,
    CopyCutPanelComponent
  ],

  imports: [
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RestangularModule.forRoot([AuthService], RestangularConfigFactory),
    SimpleNotificationsModule.forRoot(),
    DragulaModule.forRoot(),
    BrowserAnimationsModule,
    NgxUploaderModule,
    FontAwesomeModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatTooltipModule,
    HttpModule,
    ProgressHttpModule,
    OrderModule
  ],
  entryComponents: [FullFileComponent, NewFolderComponent],
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
