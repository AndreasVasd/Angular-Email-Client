import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css']
})
export class EmailIndexComponent implements OnInit {
  emails = [];

  constructor(private emailService: EmailService) { }

  ngOnInit() {
    this.emailService.getEmails().subscribe((emails) => {
      next: response => {
        console.log(response);
    }
    this.emails = emails; //η κενη array με τα emails γεμιζει με τα emails που που παίρνουμε σαν response
    })

}}
