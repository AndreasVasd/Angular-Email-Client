import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignUpCredentails {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignUpResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
   return this.http.post<UsernameAvailableResponse>('https://api.angular-email.com/auth/username', {
      username /*because key, value are the same I can do this */
  });
  }


  signup(credentials: SignUpCredentails) { //credentials are form values (username, password, passwordConfirmation)
    return this.http.post<SignUpResponse>('https://api.angular-email.com/auth/signup', credentials); //what is returned from post request can be seen in Preview of Network tab
  }
}
