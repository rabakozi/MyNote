import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService, IAuthentication } from './auth/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './auth/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  public name: string;
  public isAuthenicated: Boolean = false;
  public endDateTime: string;

  public currentRoute: string;
  public title: string;
  public version: string;
  public webApiEndPoint: string;
  public imagesDirectory: string;

  public authentication: IAuthentication;

  constructor(

    private authService: AuthService,
    private router: Router,
    private elementRef: ElementRef,
    private localStorageService: LocalStorageService
  ) {

    let native = this.elementRef.nativeElement;

    this.webApiEndPoint = native.getAttribute("webApiEndPoint");
    this.imagesDirectory = native.getAttribute("imagesDirectory");

    console.log("images directory=" + this.imagesDirectory);
  }

  public ngOnInit() {

    this.authService.getAuthentication().subscribe((response: IAuthentication) => {

      this.authentication = response;

    }, (error) => {
      
    });

    this.authService.refreshAuthData();
  }

  logout() {
    this.authService.logout();
  }


}
