import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./home/register.component";
import { LoginComponent } from "./home/login.component";
import { UserProfileComponent } from "./home/user-profile.component";

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'home/register', component: RegisterComponent },
    { path: 'home/login', component: LoginComponent },
    { path: 'home/user-profile', component: UserProfileComponent },
    { path: 'notes', loadChildren: './notes/note.module#NoteModule' },
    { path: 'home', component: HomeComponent },
    //{ path: '', component: HomeComponent },
    { path: '**', redirectTo: 'home' },])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
