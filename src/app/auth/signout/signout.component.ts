import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css'],
})
export class SignoutComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService.signOut().subscribe(() => {
      // navigate the user to the Sign-In page.
      this.router.navigateByUrl('/');
    });
  }
}
