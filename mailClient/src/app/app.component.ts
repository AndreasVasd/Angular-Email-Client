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
    //call the function which checks if the user is already SignedIn when the user visits the app
    this.authService.checkAuth().subscribe(() => {}); 
  }

 
}
