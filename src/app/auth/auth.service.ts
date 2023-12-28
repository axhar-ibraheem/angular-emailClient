import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this.http.post<ResponseSignUp>(
      `${this.rootUrl}/auth/signup`,
      credentials,
    );
  }
}
