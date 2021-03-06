import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import { HttpHeaders } from "@angular/common/http";
import { LocalStorageService } from "./local-storage.service";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
  }

  private serviceBase = environment.serviceBaseUrl;

  private ngAuthSettings = {
    serviceBaseUrl: this.serviceBase,
    clientId: 'ngAuthApp'
  };

  private authentication: IAuthentication;
  private authSubject = new Subject<IAuthentication>();

  externalAuthData = {
    provider: "",
    userName: "",
    externalAccessToken: ""
  };

  saveRegistration(registration): any {
    this.logout();
    let body = JSON.stringify(registration);
    let obs = this.http.post(this.serviceBase + '/api/account/register', body, { headers: new HttpHeaders().set('Content-Type', 'application/json') }).share();
    obs.subscribe(() => {
      //debugger;
    }, error => {});

    return obs;
  }

  login(loginData): any {
    let data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

    if (loginData.useRefreshTokens) {
      data = data + "&client_id=" + this.ngAuthSettings.clientId;
    }

    let obs = this.http.post(this.serviceBase + '/token', data, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') }).share();

    obs.subscribe((response: any) => {
      this.setAuthData(true, response.userName, loginData.useRefreshTokens, response.access_token, response.refresh_token);
      },
      (error) => {
        this.logout();
      });

    return obs;
  }

  refreshToken(): any {
    let authData: any = this.localStorageService.get('authorizationData');

    if (authData) {

      if (authData.useRefreshTokens) {

        var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + this.ngAuthSettings.clientId;

        this.removeAuthData();

        let obs = this.http.post(this.serviceBase + '/token', data, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') }).
          subscribe((response: any) => {
              this.setAuthData(true, response.userName, true, response.access_token, response.refresh_token);
          },
          (error) => {
            this.logout();
          });

        return obs;
      }
    }
  }

  logout(): any {
    this.localStorageService.remove('authorizationData');

    this.refreshAuthData();
  }

  obtainAccessToken(externalData): any {
    return this.http.post(this.serviceBase + '/api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).
      subscribe((response: any) => {
          this.setAuthData(true, response.userName, false, response.access_token, response.refresh_token);
      },
      (error) => {
        this.logout();
      });
  }

  registerExternal(registerExternalData): any {
    return this.http.post(this.serviceBase + '/api/account/registerexternal', registerExternalData).
      subscribe((response: any) => {
          this.setAuthData(true, response.userName, false, response.access_token, response.refresh_token);
      },
      (error) => {
        this.logout();
      });
  }

  public refreshAuthData() {
    let storedAuthData: IAuthentication = this.localStorageService.get('authorizationData') as IAuthentication;
    let authData: IAuthentication;

    if (storedAuthData) {
      authData = (Object.assign({}, storedAuthData));
    } else {
      authData = { isAuthenticated: false };
    }

    this.authSubject.next(Object.assign({}, authData));
  }

  getAuthentication(): Observable<IAuthentication> {
    return this.authSubject.asObservable();
  }

  private setAuthData(isAuthenticated: boolean, userName: string, useRefreshTokens: boolean, token: string, refreshToken: string) {
    this.localStorageService.set('authorizationData',
      {
        isAuthenticated: isAuthenticated,
        token: token,
        userName: userName,
        refreshToken: refreshToken,
        useRefreshTokens: useRefreshTokens
      });

    this.refreshAuthData();
  }

  private removeAuthData() {
    this.localStorageService.remove('authorizationData');

    this.refreshAuthData();
  }
   
}

export interface IAuthentication {
  isAuthenticated: boolean;
  userName?: string;
  useRefreshTokens?: boolean;
  token?: string;
  refreshToken?: string;
}

export interface IUser {
  userName: string;
  password: string;
  confirmPassword: boolean;
}


