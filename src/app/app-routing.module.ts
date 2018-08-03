import {SignupComponent} from './signup/signup.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '@app/login/login.component';
import {UploadFileComponent} from '@app/upload-file/upload-file.component';

const routes: Routes = [{path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'upload', component: UploadFileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
