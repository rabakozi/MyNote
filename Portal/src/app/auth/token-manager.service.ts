import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class TokenManagerService {

  constructor(private http: HttpClient) { }

  // TODO:
  private ngAuthSettings: any; // TODO:

  private apiEndpoint = this.ngAuthSettings.serviceBaseUrl + '/api/refreshtokens';

  getRefreshTokens() {
    return this.http.get(this.apiEndpoint);
    //return $http.get(serviceBase + 'api/refreshtokens').then(function (results) {
    //  return results;
    //});
  };

  deleteRefreshTokens(tokenid) {

    return this.http.delete(this.apiEndpoint + '/?tokenid=' + tokenid);
    //.then(function (results) {
    //  return results;
    //});
  };
}
