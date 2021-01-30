import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signedin$: BehaviorSubject<boolean>; 

  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedin$; 
  }

  ngOnInit() {
    //call the function whicj checks if the user is already SignedIn
    this.authService.checkAuth().subscribe(() => {}); 
  }

 
}
