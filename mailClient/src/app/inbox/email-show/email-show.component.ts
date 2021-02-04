import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //for getting access to url
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {

  constructor(private route: ActivatedRoute, private emailService: EmailService) { }

  ngOnInit() {
    console.log(this.route);
    //params is a Behavior Subject that emits events every time the url changes..so we subscribe to url changes 
    //(that happen when user clicks an email)
    this.route.params.subscribe(({ id }) => {
      this.emailService.getEmail(id).subscribe(email => { //παίρνουμε το συγκεκριμενο mail βασει του id του
        console.log(email);
      })
    })
  }

}
