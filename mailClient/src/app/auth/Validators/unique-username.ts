import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root'}) //we add that to be able to use HttpClient by injecting it
export class UniqueUsername implements AsyncValidator {
    constructor(private AuthService: AuthService) {}

    validate = (control: FormControl) => {
        const { value } = control; //destructuring - pull out the control value

        return this.AuthService.usernameAvailable(value)
        .pipe(
            map( value => { //receives value comes out from the post request
               if (value.available) {
                return null; 
               }
            }),
            catchError((err) => {
                console.log(err);
                if (err.error.username) {
                    return of({ nonUniqueUsername: true }) //emits the error
                } else {
                    return of({ noConnection: true }) //emits the error
                }
            })
        );
    }
}
