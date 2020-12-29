import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from '../Validators/match-password'; //add the MatchPassword custom Validator
import { UniqueUsername } from '../Validators/unique-username';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], [this.uniqueUsername.validate]), //1st argument is the default value, 2nd sync validators, 3rd async validators
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  }, { validators: [this.matchPassword.validate]});//overal form Validator

  constructor(private matchPassword: MatchPassword,
              private uniqueUsername: UniqueUsername,
              private authService: AuthService) { }

  ngOnInit() {}
    
  onSubmit() {
    if(this.authForm.invalid) {
      return; //do nothing if the whole form is invalid
    }
    this.authService.signup(this.authForm.value) //argument is all form values 
      .subscribe({
        next: response => {
          console.log(response); //to see what is returned in success case
         //navigate to a route
        },
        error: (err) => {
          console.log(err); //to take info about the error response
          if(err.status === 0) {  //we saw that we have a status that is 0 among other respones  -when network went offline
            this.authForm.setErrors({ noConnection: true }) //setErrors is Angular internal
          } else {
            this.authForm.setErrors({ unknownError: true })
          }
        }
      });
  }

}
