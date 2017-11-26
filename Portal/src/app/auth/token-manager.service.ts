import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class TokenManagerService {

  constructor(private http: HttpClient) { }

  // TODO:
  private ngAuthSettings: any; // TODO:

  private serviceBase = this.ngAuthSettings.apiServiceBaseUri;

  getRefreshTokens() {
    return this.http.get(this.serviceBase + 'api/refreshtokens');
    //return $http.get(serviceBase + 'api/refreshtokens').then(function (results) {
    //  return results;
    //});
  };

  deleteRefreshTokens(tokenid) {

    return this.http.delete(this.serviceBase + 'api/refreshtokens/?tokenid=' + tokenid);
    //.then(function (results) {
    //  return results;
    //});
  };
}
