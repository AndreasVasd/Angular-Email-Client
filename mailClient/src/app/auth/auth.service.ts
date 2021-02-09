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

interface SigninCredentials {
  username: string;
  password: string;
}

interface SignUpResponse {
  username: string;
}

interface SigninResponse { 
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

  signedin$ = new BehaviorSubject(null); //$ convention in Observables - we use behavior subject because it listens every new
                                          //subscription by giving the last emited value and it can get a default value (here it is the false value)
  username= '';

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
      tap((response) => {
        this.signedin$.next(true); //indicator that now we are signed In
        this.username = response.username;
      })
    );
  } 

  //check if the user is already Signed In
  checkAuth() {
    return this.http.get<SignedInResponse>('https://api.angular-email.com/auth/signedin')
    .pipe(
      tap(( { authenticated, username }) => { //we pull out authenticated, username via destructuring from response obj
        this.signedin$.next(authenticated);
        this.username = username;
      })
    )
  }

  signout() {
    return this.http.post<SignedInResponse>('https://api.angular-email.com/auth/signout', {}) //I add empty body (I always have to put body in post requests)
    .pipe(
      tap(() => {
        //this.signedin$.next(!authenticated);
        this.signedin$.next(false);
      })
    )
  }

  signin(credentials: SigninCredentials) {
    return this.http.post<SigninResponse>('https://api.angular-email.com/auth/signin', credentials) //we pass credentials as body
    .pipe(
      tap((response) => {
        this.signedin$.next(true);
        this.username = response.username; //το περιεχόμενο της μεταβλητής username να ισούται με το response.username
      })
    )
  }
}
