import { Component, EventEmitter, OnInit, Input, ElementRef, ApplicationRef } from '@angular/core';
import { AuthService } from './auth/auth.service';
//import { User } from './entities/user.entity';
//import { UserService } from './services/user.service';
//import { CustomerService } from './services/customer.service';
//import { HttpService } from './services/http.service';
//import { BlockUIService } from './services/blockui.service';
//import { AlertService } from './services/alert.service';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //providers: [UserService, CustomerService, HttpService, BlockUIService, AlertService]
  
})
export class AppComponent implements OnInit {

  public name: string;
  public isAuthenicated: Boolean = false;
  public endDateTime: string;

  public blockUI: Boolean;

  public currentRoute: string;
  public title: string;
  public version: string;
  public webApiEndPoint: string;
  public imagesDirectory: string;

  constructor(

    private authService: AuthService,
    //private userService: UserService,
    //private blockUIService: BlockUIService,
    private router: Router,
    private elementRef: ElementRef
  ) {

    let native = this.elementRef.nativeElement;

    this.webApiEndPoint = native.getAttribute("webApiEndPoint");
    this.imagesDirectory = native.getAttribute("imagesDirectory");

    console.log("images directory=" + this.imagesDirectory);

    //authService. = this.webApiEndPoint;

  }

  public ngOnInit() {

    //this.sessionService.version = this.version;

    //this.sessionService.sessionEvent.subscribe(user => this.onAuthenication(user));
    //this.blockUIService.blockUIEvent.subscribe(event => this.blockUnBlockUI(event));

    //this.blockUIService.blockUIEvent.emit({
    //  value: true
    //});

    //let user: User = new User();

    //this.userService.authenicate(user)
    //  .subscribe(
    //  response => this.authenicateOnSuccess(response),
    //  response => this.authenicateOnError(response));


  }

  private blockUnBlockUI(event) {
    this.blockUI = event.value;
  }

  private authenicateOnSuccess(response: any) {

    //this.blockUIService.blockUIEvent.emit({
    //  value: false
    //});

    //if (response.returnStatus == false) {
    //  return;
    //}

    //let user: User = new User();
    //user.emailAddress = response.emailAddress;
    //user.firstName = response.firstName;
    //user.lastName = response.lastName;
    //user.addressLine1 = response.addressLine1;
    //user.addressLine2 = response.addressLine2;
    //user.city = response.city;
    //user.state = response.state;
    //user.zipCode = response.zipCode;

    //this.name = response.firstName;
    //this.isAuthenicated = true;

    //// TODO:
    ////this.sessionService.authenicated(user);

    //this.currentRoute = this.router.url;

    //if (this.currentRoute == "/" || this.currentRoute == undefined) {
    //  this.router.navigate(['/home/home']);
    //  return;
    //}
    //else {
    //  this.router.navigate([this.currentRoute]);
    //}

  }

  private authenicateOnError(response) {

    //this.isAuthenicated = false;
    //this.blockUIService.blockUIEvent.emit({
    //  value: false
    //});
  }

  private onAuthenication(user: any): void {

    //this.firstName = user.n;
    //this.lastName = user.lastName;
    //this.isAuthenicated = true;

  }

  public logout() {

    //this.firstName = "";
    //this.lastName = "";
    //this.isAuthenicated = false;
    //this.sessionService.logout();

    if (typeof (Storage) !== "undefined") {
      localStorage.setItem("CodeProject.Angular4.Token", "");
    }

    this.router.navigate(['/home/home']);

  }


}
