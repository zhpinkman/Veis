import { LoginComponent } from '@app/login/login.component';
import { UtilitiesService } from '@app/Services/utilities.service';
import { AuthService } from '@app/Services/auth.service';
import { User } from '@app/User';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {
  FormGroup,
  FormControl,
  FormControlDirective,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private utils: UtilitiesService,
    private router: Router
  ) {}
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
  createRegisterForm() {
    this.registerForm = new FormGroup({
      email: this.email,
      password: this.password,
      bucket: this.bucket
    });
  }
  createFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @+-]*@(ut.ac.ir)$')
    ]);
    this.password = new FormControl('', Validators.required);
    this.bucket = new FormControl('', Validators.required);
  }

  bucketDefaultGenerator() {
    let position = this.email.value.indexOf('@');
    if (position == -1) {
      return this.email.value;
    } else {
      return this.email.value.substring(0, position);
    }
  }

  bucketGenerator() {
    this.bucket.setValue(this.bucketDefaultGenerator());
    this.bucket.patchValue(this.bucketDefaultGenerator());
  }

  signup() {
    this.click();
    if (this.registerForm.invalid) {
      this.bool = true;
      this.utils.error(
        'Failed',
        'please fill the from in the correct format!!'
      );
    } else {
      let newUser: User = {
        email: this.email.value,
        password: this.password.value,
        bucketName: this.bucket.value
      };
      this.authService.signupRequest(newUser).subscribe(
        res => {
          this.utils.success('success', 'Signed up successfully');
          this.router.navigate(['/login']);
        },
        error => {
          this.bool = true;
          if (error.status == 409)
            this.utils.error('Failed', 'Email or Bucket exists');
        }
      );
    }
  }
  bool: boolean = true;
  click() {
    this.bool = false;
  }
}
