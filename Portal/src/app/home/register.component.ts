import { Component, OnInit, ViewChild, ContentChild, AfterViewInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService, IUser } from "../auth/auth.service";
import { Observable } from "rxjs/Observable";

declare var NotificationFx: any;

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  user: IUser;
  title: string = "Register";
  message: string = "";

  constructor(private authService: AuthService, private router: Router, private zone: NgZone) { }

  public ngOnInit() {
    this.user = <IUser>{};
  }

  registerUser($event): void {
    //this.clearInputErrors();
    this.authService.saveRegistration(this.user)
      .subscribe(
      response => {
        debugger;
        //$scope.savedSuccessfully = true;
        this.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
        setTimeout(this.redirectToLogin, 2 * 1000);
      },
      error => { });

  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

}

