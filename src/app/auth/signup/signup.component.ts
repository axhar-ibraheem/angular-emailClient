import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';
import { SignUpCredentials } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
  ) {}

  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUsername.validate],
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    },
    {
      validators: [this.matchPassword.validate],
    },
  );

  onSubmit() {
    const { value } = this.authForm;
    this.authService.signup(value as SignUpCredentials).subscribe({
      next: (response) => {
        // navigate to dashboard route //
      },

      error: (err) => {
        console.log(err);
        if (!err.status) {
          this.authForm.setErrors({
            noConnection: true,
          });
        } else {
          this.authForm.setErrors({
            unknownError: true,
          });
        }
      },
    });
  }
}
