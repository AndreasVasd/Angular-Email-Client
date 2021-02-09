import { Component, OnInit, Input } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent implements OnInit {
  showModal = false;
  @Input() email: Email; //αντιστοιχει στο [email] που βρισκεται εντος του email.show.html

  constructor(private emailService: EmailService) { }

  ngOnChanges() {  //αν δε το αντιστρεψω όταν κανω reply το from εμφανιζεται στη θεση του to κι αναποδα
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      text: `\n\n\n ${this.email.from} wrote:\n ${this.email.text}`
    };
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }

}
