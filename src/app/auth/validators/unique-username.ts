import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { map, catchError, of } from 'rxjs';

import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (
    control: AbstractControl,
  ): Observable<ValidationErrors | null> => {
    return this.authService.userNameAvailable(control.value).pipe(
      map(() => {
        return null;
      }),
      catchError((err) => {
        console.log(err.error.username);
        if (err.error.username) {
          return of({
            nonUniqueUsername: true,
          });
        } else {
          return of({
            noConnection: true,
          });
        }
      }),
    );
  };
}
