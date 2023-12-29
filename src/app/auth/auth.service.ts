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

export interface SignInCredentials {
  username: string;
  password: string;
}

interface ResponseSignUp {
  username: string;
}

interface SignedInResponse {
  authenticated: boolean;
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
      .post<ResponseSignUp>(`${this.rootUrl}/auth/signup`, credentials)
      .pipe(
        tap(() => {
          this.signedIn$.next(true);
        }),
      );
  }

  checkAuth() {
    return this.http
      .get<SignedInResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        tap(({ authenticated }) => {
          this.signedIn$.next(authenticated);
        }),
      );
  }

  signOut() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedIn$.next(false);
      }),
    );
  }

  signin(credentials: SignInCredentials) {
    return this.http.post<any>(`${this.rootUrl}/auth/signin`, credentials).pipe(
      tap(() => {
        this.signedIn$.next(true);
      }),
    );
  }
}
