import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

interface userNameAvailableResponse {
  available: boolean;
}

export interface SignUpCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface ResponseSignUp {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signedIn$ = new BehaviorSubject(false);
  rootUrl = 'https://api.angular-email.com';

  userNameAvailable(username: string) {
    return this.http.post<userNameAvailableResponse>(
      `${this.rootUrl}/auth/username`,
      {
        username,
      },
    );
  }

  signup(credentials: SignUpCredentials) {
    return this.http
      .post<ResponseSignUp>(`${this.rootUrl}/auth/signup`, credentials, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.signedIn$.next(true);
        }),
      );
  }

  checkAuth() {
    return this.http
      .get(`${this.rootUrl}/auth/signedin`, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          console.log(response);
        }),
      );
  }
}
