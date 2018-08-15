import { UtilitiesService } from '@app/Services/utilities.service';
import { HomeComponent } from '@app/home/home.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@app/Services/auth.service';
import { User } from '@app/User';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  rememberMe: FormControl;
  getFromLocalStorsge(): any {
    this.email.setValue(localStorage.getItem('email'));
    this.email.patchValue(localStorage.getItem('email'));
    // console.log ("rijuihihr")
    console.log(this.email.value);
    // console.log (localStorage.getItem("email"))
    this.password.setValue(localStorage.getItem('password'));
    this.password.patchValue(localStorage.getItem('password'));
  }
  // checked: boolean = true;
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;
  spinHide: boolean = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private utils: UtilitiesService
  ) {
    this.utils.setTitle('Login');
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.rememberMe = new FormControl('');
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe
    });
  }

  ngOnInit() {
    this.getFromLocalStorsge();
  }
  login() {
    this.spinHide = false;
    if (!this.email.valid || !this.password.valid) return;

    let user: User = { email: this.email.value, password: this.password.value };
    // console.log("email " + this.email.value);
    // console.log(user);
    this.authService.LoginRequest(user).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['']);
        this.utils.success('success', 'you have successfully loged in ');
        this.spinHide = true;
      },
      error => {
        this.utils.error('Error', 'user name or password is invalid!!');
        console.error(error);
        this.spinHide = true;
      }
    );
    // console.log(this.rememberMe.value);
    if (this.rememberMe.value) this.rememberMeFunc(user);
  }
  rememberMeFunc(user: User) {
    localStorage.setItem('email', user.email);
    localStorage.setItem('password', user.password);
  }
}
