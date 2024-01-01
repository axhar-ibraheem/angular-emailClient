import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  rootUrl = 'https://api.angular-email.com';

  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.rootUrl}/emails`);
  }
}
