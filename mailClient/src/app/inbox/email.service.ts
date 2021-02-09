import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from '../inbox/email';

interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}


@Injectable({
  providedIn: 'root'
})
export class EmailService {
  rootUrl = 'https://api.angular-email.com'

  constructor(private http: HttpClient) { }

  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.rootUrl}/emails`);
  }

  //Gets the specific email for EmailShow component
  getEmail(id: string) {
    return this.http.get<Email>(`${this.rootUrl}/emails/${id}`)
  }

  //Send the user's email to the API
  sendEmail(email: Email) {
    return this.http.post<Email>(`${this.rootUrl}/emails`, email) //email is the body of post request
  }
}
