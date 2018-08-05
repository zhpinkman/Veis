import { HomeComponent } from '@app/home/home.component';
import { AuthGuard } from '@app/Services/authguard';
import {SignupComponent} from '@app/signup/signup.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '@app/login/login.component';
import {UploadFileComponent} from '@app/upload-file/upload-file.component';

const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'upload', component: UploadFileComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
