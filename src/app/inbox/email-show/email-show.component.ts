import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email.service';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent {
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      const { email } = data;
      this.email = email;
    });
    // console.log(this.route.snapshot.data);
  }

  email!: Email;
}
