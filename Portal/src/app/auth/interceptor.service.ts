import { Injectable } from '@angular/core';
import { LocalStorageService } from "./local-storage.service";
import { AuthService } from "./auth.service";
import { Router } from '@angular/router';

@Injectable()
export class InterceptorService {

  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private router: Router) { }

  request(config) {

    config.headers = config.headers || {};

    let authData: any = this.localStorageService.get('authorizationData');
    if (authData) {
      config.headers.Authorization = 'Bearer ' + authData.token;
    }

    return config;
  }

  responseError(rejection) {
    if (rejection.status === 401) {
      var authData: any = this.localStorageService.get('authorizationData');

      if (authData) {
        if (authData.useRefreshTokens) {
          this.router.navigate(['/refresh']);
          //return $q.reject(rejection);
        }
      }
      this.authService.logout();
      this.router.navigate(['/refresh']);
    }
    //return $q.reject(rejection);
  }

}
