import { Component, OnInit, ViewChild, ContentChild, AfterViewInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from "../auth/auth.service";

declare var NotificationFx: any;

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public title: string = "";
  public userName: string = "";
  public emailAddress: string = "";
  public password: string = "";
  public passwordConfirmation: string = "";
  public alerts: Array<string> = [];
  public messageBox: string;

  public testMessages: Array<string> = [];

  public firstNameInputError: Boolean;
  public lastNameInputError: Boolean;
  public emailAddressInputError: Boolean;
  public passwordInputError: Boolean;
  public passwordConfirmationInputError: Boolean;
  public showSpinner = false;
  public selectedCar: string;

  //@ViewChild(AlertBoxComponent) alertBoxComponent: AlertBoxComponent;

  constructor(private authService: AuthService, private router: Router, private zone: NgZone) { }

  public ngOnInit() {
    this.clearInputErrors();
    this.title = "Register";
    this.userName = "William Gates";
    this.emailAddress = "wgates@microsoft.com";
    this.password = "microsoft";
    this.passwordConfirmation = "microsoft";
  }

  registerUser($event): void {

    //let user: User = new User();
    //user.emailAddress = this.emailAddress;
    //user.userName = this.userName;
    //user.password = this.password;
    //user.passwordConfirmation = this.passwordConfirmation;

    //this.clearInputErrors();
    let user = {
      userName: "mikorka",
      password: "kalman",
      confirmPassword: "kalman"
    };
    debugger;
    this.authService.saveRegistration(user);
      //.subscribe(
      //response => this.registerUserOnSuccess(response),
      //response => this.registerUserOnError(response));

  }

  private clearInputErrors() {
    this.firstNameInputError = false;
    this.lastNameInputError = false;
    this.emailAddressInputError = false;
    this.passwordInputError = false;
    this.passwordConfirmationInputError = false;
  }

  private registerUserOnSuccess(response): void {

    //let user: User = new User();
    //user.userID = response.userID;
    //user.emailAddress = response.emailAddress;
    //user.firstName = response.firstName;
    //user.lastName = response.lastName;

    //this.sessionService.authenicated(user);

    //this.router.navigate(['/home/home']);

  }

  private registerUserOnError(response): void {
    //this.alertService.renderErrorMessage(response.returnMessage);
    //this.messageBox = this.alertService.returnFormattedMessage();
    //this.alerts = this.alertService.returnAlerts();
    //this.alertService.setValidationErrors(this, response.validationErrors);
  }
}

