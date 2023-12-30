import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInCredentials } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });

  onSubmit() {
    if (this.authForm.invalid) return;
    const { value } = this.authForm;
    this.authService.signin(value as SignInCredentials).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox');
      },
      error: ({ error }) => {
        if (error.username || error.password) {
          this.authForm.setErrors({
            credentials: true,
          });
        }
      },
    });
  }
}
