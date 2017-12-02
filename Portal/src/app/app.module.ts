import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { NoteModule } from "./notes/note.module";
import { AppRoutingModule } from './/app-routing.module';
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { LocalStorageService } from "./auth/local-storage.service";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login.component';
import { RegisterComponent } from './home/register.component';
import { UserProfileComponent } from './home/user-profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/interceptor.service';
import { NoteService } from "./notes/note.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NoteModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [AuthService, LocalStorageService, NoteService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
