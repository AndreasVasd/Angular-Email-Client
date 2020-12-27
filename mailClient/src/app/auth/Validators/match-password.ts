import { Injectable } from '@angular/core';
import { Validator, FormGroup } from '@angular/forms';

//Custom Validator - by implementing Validator we ensure that all the apropriate methods will be included
@Injectable({ providedIn: 'root'})
export class MatchPassword implements Validator {
    validate(formGroup: FormGroup) { //we could use AbstarctControl which means that we can have either formControl or formGroup
        const { password, passwordConfirmation } = formGroup.value; //destructuring

        if (password === passwordConfirmation) {
            return null; //success case
        } else {
            return { passwordsDontMatch: true }; //error case
        }
        
    }
}
