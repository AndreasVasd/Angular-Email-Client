import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Email } from './email';
import { EmailService } from '../inbox/email.service';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email>{

  constructor(private emailService: EmailService) { }

  resolve(route: ActivatedRouteSnapshot) { //with route we get access to email id in url - υποχρεωτικο argument
    const { id } = route.params; //destructuring

    return this.emailService.getEmail(id);
  }
}
