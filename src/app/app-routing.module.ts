import { CompactFileComponent } from './compact-file/compact-file.component';
import { HomeComponent } from '@app/home/home.component';
import { AuthGuard } from '@app/Services/authguard';
import { SignupComponent } from '@app/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@app/login/login.component';
import { UploadFileComponent } from '@app/upload-file/upload-file.component';
import { FilesListComponent } from '@app/files-list/files-list.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: UploadFileComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'file', component: CompactFileComponent, canActivate: [AuthGuard] },
  { path: 'list', component: FilesListComponent, canActivate: [AuthGuard] },
  { path: 'list/:id', component: FilesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
