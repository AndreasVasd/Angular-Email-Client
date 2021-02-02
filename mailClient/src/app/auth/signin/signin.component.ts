import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  });

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    //authForm argument includes the form control values
    //afterwards we do error handling in case the user who signs in doesn't have the right credentials
    this.authService.signin(this.authForm.value).subscribe( {
      next: () => {

      },
      error: ({error}) => { //the error object we get in case of an error
        if (error.username || error.password) {
          this.authForm.setErrors({ credentials: true });
        }

      }
    });
  }

}
