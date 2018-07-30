import { AuthService } from './../Services/auth.service';
import { User } from './../User';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }
  registerForm: FormGroup;
  username: FormControl;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  bucket: FormControl;
  ngOnInit() {
      this.createFormControls();
      this.createRegisterForm();
  }
  createRegisterForm(){
    this.registerForm = new FormGroup({
      email: this.email,
      password: this.password,
      bucket : this.bucket
    });
  }
  createFormControls(){
    this.email =  new FormControl('',[Validators.required, Validators.pattern("[^ @+-]*@(ut.ac.ir)$")]);
    this.password =  new FormControl('', Validators.required);
    this.bucket =  new FormControl('', Validators.required);
  }

  bucketDefaultGenerator(){
    let position = this.email.value.indexOf('@');
    if(position == -1){
      return this.email.value;
    }
    else{
      return this.email.value.substring(0, position);
    }
  }

  // signup(){
  //   let newUser: User = { email: this.email.value, password: this.password.value, bucket: this.bucket.value};
  //   this.authService.signupRequest(newUser).subscribe(
  //     res => console.log(res),
  //     error => console.error(error)
  //   );
  // }
}