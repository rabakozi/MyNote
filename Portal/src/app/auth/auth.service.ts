import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpHeaders } from "@angular/common/http";
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  private serviceBase = 'http://localhost:9000'

  private ngAuthSettings = {
    apiServiceBaseUri: this.serviceBase,
    clientId: 'ngAuthApp'
  };

  authentication = {
    isAuth: false,
    userName: "",
    useRefreshTokens: false
  };

  externalAuthData = {
    provider: "",
    userName: "",
    externalAccessToken: ""
  };

  saveRegistration(registration): any {
    this.logout();

    return this.http.post(this.serviceBase + 'api/account/register', registration);
  };

  login(loginData): any {

    let data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

    if (loginData.useRefreshTokens) {
      data = data + "&client_id=" + this.ngAuthSettings.clientId;
    }

    return this.http.post(this.serviceBase + 'token', data, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') }).
      subscribe((response: any) => {
        if (loginData.useRefreshTokens) {
          this.localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: response.refresh_token, useRefreshTokens: true });
        }
        else {
          this.localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false });
        }
        this.authentication.isAuth = true;
        this.authentication.userName = loginData.userName;
        this.authentication.useRefreshTokens = loginData.useRefreshTokens;
      },
      (error) => {
        this.logout();
      });
  };

  logout(): any {
    this.localStorageService.remove('authorizationData');

    this.authentication.isAuth = false;
    this.authentication.userName = "";
    this.authentication.useRefreshTokens = false;
  };

  fillAuthData(): any {
    let authData: any = this.localStorageService.get('authorizationData');
    if (authData) {
      this.authentication.isAuth = true;
      this.authentication.userName = authData.userName;
      this.authentication.useRefreshTokens = authData.useRefreshTokens;
    }
  };

  refreshToken(): any {
    let authData: any = this.localStorageService.get('authorizationData');

    if (authData) {

      if (authData.useRefreshTokens) {

        var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + this.ngAuthSettings.clientId;

        this.localStorageService.remove('authorizationData');

        return this.http.post(this.serviceBase + 'token', data, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') }).
          subscribe((response: any) => {
            this.localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });
          },
          (error) => {
            this.logout();
          });
      }
    }
  };

  obtainAccessToken(externalData): any {

    return this.http.post(this.serviceBase + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).
      subscribe((response: any) => {
        this.localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

        this.authentication.isAuth = true;
        this.authentication.userName = response.userName;
        this.authentication.useRefreshTokens = false;
      },
      (error) => {
        this.logout();
      });
  };

  registerExternal(registerExternalData): any {

    return this.http.post(this.serviceBase + 'api/account/registerexternal', registerExternalData).
      subscribe((response: any) => {
        this.localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

        this.authentication.isAuth = true;
        this.authentication.userName = response.userName;
        this.authentication.useRefreshTokens = false;
      },
      (error) => {
        this.logout();
      });
  };
}
