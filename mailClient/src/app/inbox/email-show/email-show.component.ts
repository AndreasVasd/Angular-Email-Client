import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //for getting access to url
import { EmailService } from '../email.service';
import { switchMap }from 'rxjs/operators';
import { Email } from '../email';
 
@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {

  email: Email;


  constructor(private route: ActivatedRoute, private emailService: EmailService) { }

  ngOnInit() {
    console.log(this.route);
    /* 1ST WAY
    //params is a Behavior Subject that emits events every time the url changes..so we subscribe to url changes 
    //(that happen when user clicks an email)
    this.route.params.subscribe(({ id }) => { //we pull out id property via destructuring form params object
      this.emailService.getEmail(id).subscribe(email => { //παίρνουμε το συγκεκριμενο mail βασει του id του
        console.log(email);
      })
    })*/

    //2ND WAY - with switchMap
    this.route.params
      .pipe(
        switchMap(( { id }) => {
          return this.emailService.getEmail(id);
        })
      )
      .subscribe(email => {
        //console.log(email);
        this.email = email;
      });

  }

}
