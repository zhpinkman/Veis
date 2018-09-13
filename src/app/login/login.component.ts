import { TokenService } from '@app/Services/token.service';
import { ActivationRequest } from '@app/activationRequest';
import { UtilitiesService } from '@app/Services/utilities.service';
import { HomeComponent } from '@app/home/home.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@app/Services/auth.service';
import { User } from '@app/User';
import { Router, ActivatedRoute } from '@angular/router';

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
    // console.log(this.email.value);
    this.password.setValue(localStorage.getItem('password'));
    this.password.patchValue(localStorage.getItem('password'));
  }
  // checked: boolean = true;
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;
  spinHide: boolean = true;
  isHidden: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private utils: UtilitiesService,
    private route: ActivatedRoute,
    private tokenService: TokenService
  ) {
    this.route.data.subscribe(data => {
      // console.log(data['hide']);
      if (data['hide']) this.isHidden = true;
    });
    this.route.queryParams.subscribe(params => {
      // console.log(params);
      if (params['userId'] && params['token']) {
        // console.log('asdasdasdas');
        let request = new ActivationRequest();
        request.userId = params['userId'];
        request.token = params['token'];
        this.authService.activationRequest(request).subscribe(
          data => {
            this.utils.success('Activated', 'Your account is activated now');
            this.isHidden = false;
          },
          error => {
            this.utils.error('Not Activated', error.data.message);
            this.isHidden = false;
            // console.log(error);
          }
        );
      }
    });
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
    if (this.tokenService.accessToken) {
      this.router.navigate(['/myfiles']);
    }
  }
  login() {
    this.spinHide = false;
    if (!this.email.valid || !this.password.valid) return;

    let user: User = { email: this.email.value, password: this.password.value };
    // console.log("email " + this.email.value);
    // console.log(user);
    this.authService.LoginRequest(user).subscribe(
      res => {
        // console.log(res);
        this.router.navigate(['/myfiles']);
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
