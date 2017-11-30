import { Component, OnInit, ViewChild, ContentChild, AfterViewInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService, IUser } from "../auth/auth.service";
import { Observable } from "rxjs/Rx";

declare var NotificationFx: any;

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  user: IUser;
  title: string = "Register";
  message: string = "";
  private timer;

  constructor(private authService: AuthService, private router: Router, private zone: NgZone) { }

  public ngOnInit() {
    this.user = <IUser>{};
  }

  registerUser($event): void {
    //this.clearInputErrors();
    this.authService.saveRegistration(this.user)
      .subscribe(
      response => {
        //$scope.savedSuccessfully = true;
        this.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
        this.waitAndRedirect();
      },
      error => { });

  }

  private redirectToLogin() {
    this.router.navigate(['/home/login']);
  }

  private waitAndRedirect() {
    if (this.timer) {
      this.timer.unsubscribe();
    }

    this.timer = Observable.timer(2 * 1000)
      .take(1)
      .subscribe(this.redirectToLogin.bind(this));
  }

}

