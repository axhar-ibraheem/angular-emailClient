import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { filter, Observable, pipe, tap } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      withCredentials: true,
    });
    // modify the request before it is sent and also log the modified request to the console.
    // console.log(modifiedReq);
    return next.handle(modifiedReq);
    
    // .pipe(
    // tap((value) => {
    //   if (value.type === HttpEventType.Sent) {
    //     console.log('Request was sent to the server');
    //   }
    //   if (value.type === HttpEventType.Response) {
    //     console.log('Response got from the api');
    //   }
    // }),
    // filter((value) => value.type === HttpEventType.Response),
    // tap((value) => {
    //   console.log(value);
    // }),
    // )
  }
}
