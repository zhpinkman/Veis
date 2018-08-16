import { RouteTestComponent } from '@app/route-test/route-test.component';
import { FilesListComponent } from '@app/files-list/files-list.component';
import { HomeComponent } from '@app/home/home.component';
import { AuthGuard } from '@app/Services/authguard';
import { SignupComponent } from '@app/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@app/login/login.component';
import { UploadFileComponent } from '@app/upload-file/upload-file.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'activation',
    component: LoginComponent,
    data: {
      hide: true
    }
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'upload',
        component: UploadFileComponent
      },
      {
        path: 'myfiles',
        component: FilesListComponent
      },
      {
        path: 'myfiles',
        children: [
          {
            path: '**',
            component: FilesListComponent
          }
        ]
      }
      // {
      //   path: ':path/:id',
      //   component: FilesListComponent
      // },
      // {
      //   path: ':path',
      //   component: FilesListComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
