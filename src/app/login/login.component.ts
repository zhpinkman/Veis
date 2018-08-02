import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './../Services/auth.service';
import { User } from './../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('');
  password = new FormControl('')
  loginForm: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.email = new FormControl();
    this.password = new FormControl();
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }
  Login(){
    let user: User = {email: this.email.value, password: this.password.value}
    // console.log(user)
    this.authService.LoginRequest(user).subscribe(
      res => console.log(res),
      error => {console.error(error); }
    );
  }
}
