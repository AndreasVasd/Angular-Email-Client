import { Component, OnInit, Input } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
    const {subject, from, to, text} = this.email; //pull out the properties via destructuring

    //Initialize the form Controls with the values of email we already have
    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({value: from, disabled: true}),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required])
    })
  }

}
