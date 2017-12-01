// src/app/auth/token.interceptor.ts
import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LocalStorageService } from "./local-storage.service";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  auth: AuthService;

  constructor(private injector: Injector, private localStorageService: LocalStorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.auth = this.auth || this.injector.get(AuthService);

    let authData: any = this.localStorageService.get('authorizationData');
    request = request.clone(authData ? {
      setHeaders: {
        Authorization: `Bearer ${authData.token}`
      }
    }: {});

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal
        }
      }
    });
  }
}
