import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
 
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

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signedin$ = new BehaviorSubject(false); //$ convention in Observables - we use behavior subject because it listens every new
                                          //subscription by giving the last emited value and it can get a default value (here it is the false value)

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
   return this.http.post<UsernameAvailableResponse>('https://api.angular-email.com/auth/username', {
      username /*because key, value are the same I can do this */
  });
  }

  //Sign Up the user
  signup(credentials: SignUpCredentails) { //credentials are form values (username, password, passwordConfirmation)
    return this.http.post<SignUpResponse>('https://api.angular-email.com/auth/signup', credentials) //what is returned from post request can be seen in Preview of Network tab
    .pipe(
      tap(() => {
        this.signedin$.next(true); //indicator thar now we are signed In
      })
    );
  } 

  //check if the user is already Signed In
  checkAuth() {
    return this.http.get<SignedInResponse>('https://api.angular-email.com/auth/signedin')
    .pipe(
      tap(( { authenticated }) => {
        this.signedin$.next(authenticated);
      })
    )
  }
}
