import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, IUser } from "../auth/auth.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public title: string = 'Login';
  userName: string;
  password: string;
  useRefreshTokens: boolean;
  message: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    this.authService.login({
      userName: this.userName,
      password: this.password,
      useRefreshTokens: this.useRefreshTokens
    }).subscribe(response => {
      this.router.navigate(['/notes']);
    },
      err => {
        this.message = err.error.error_description;
      });
  };
  
  authExternalProvider(provider) {

    //var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

    //var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider
    //  + "&response_type=token&client_id=" + ngAuthSettings.clientId
    //  + "&redirect_uri=" + redirectUri;

    //var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
  };

  authCompletedCB(fragment) {

    //$scope.$apply(function () {

    //  if (fragment.haslocalaccount == 'False') {

    //    authService.logOut();

    //    authService.externalAuthData = {
    //      provider: fragment.provider,
    //      userName: fragment.external_user_name,
    //      externalAccessToken: fragment.external_access_token
    //    };

    //    $location.path('/associate');

    //  }
    //  else {
    //    //Obtain access token and redirect to orders
    //    var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
    //    authService.obtainAccessToken(externalData).then(function (response) {

    //      $location.path('/orders');

    //    },
    //      function (err) {
    //        $scope.message = err.error_description;
    //      });
    //  }

    //});
  }
} 
