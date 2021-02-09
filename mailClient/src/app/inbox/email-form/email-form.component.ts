import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Email } from '../email';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  
  emailForm: FormGroup; //we normally initialize the new form here but we will so it in ngOnInit because there is the place
                        //we have access to Input properties aka email
  @Input() email: Email; //get email from parent component aka email-create (template)
  @Output() emailSubmit = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    const {subject, from, to, text} = this.email; //pull out the properties via destructuring

    //Initialize the form Controls with the values of email we already have
    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({value: from, disabled: true}),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required])
    });
  }

  onSubmit() {
    if (this.emailForm.invalid) {
      return;
    } else {
      console.log(this.emailForm.value);
      //emit all the form values with submition
      this.emailSubmit.emit(this.emailForm.value);
    }
  }

}
