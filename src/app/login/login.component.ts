import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./../Services/auth.service";
import { User } from "./../User";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  getFromLocalStorsge(): any {
    this.email.setValue(localStorage.getItem("email"));
    this.email.patchValue(localStorage.getItem("email"));
    // console.log ("rijuihihr")
    console.log(this.email.value);
    // console.log (localStorage.getItem("email"))
    this.password.setValue(localStorage.getItem("password"));
    this.password.patchValue(localStorage.getItem("password"));
  }
  email = new FormControl("");
  password = new FormControl("");
  loginForm: FormGroup;

  constructor(private authService: AuthService) {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  ngOnInit() {
    this.getFromLocalStorsge();
  }
  login() {
    if (!this.email.valid || !this.password.valid) return;

    let user: User = { email: this.email.value, password: this.password.value };
    // console.log("email " + this.email.value);
    console.log(user);
    this.authService.LoginRequest(user).subscribe(
      res => console.log(res),
      error => {
        console.error(error);
      }
    );
    this.rememberMe(user);
  }
  rememberMe(user: User) {
    localStorage.setItem("email", user.email);
    localStorage.setItem("password", user.password);
  }
}
