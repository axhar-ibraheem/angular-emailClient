import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, skipWhile, take, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.signedIn$.pipe(
      skipWhile((value) => value === null),
      // map(value => value as boolean),
      map((value) => !!value),
      take(1),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('/');
        }
      }),
    );
  }
}
