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
    const { value } = control;
    return this.authService.userNameAvailable(value).pipe(
      map(() => {
        return null;
      }),
      catchError((err) => {
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
