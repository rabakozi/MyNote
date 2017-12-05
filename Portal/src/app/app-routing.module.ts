import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./home/register.component";
import { LoginComponent } from "./home/login.component";
import { UserProfileComponent } from "./home/user-profile.component";

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home/home', component: HomeComponent, pathMatch: 'full' },
    { path: 'home/register', component: RegisterComponent, pathMatch: 'full' },
    { path: 'home/login', component: LoginComponent, pathMatch: 'full' },
    { path: 'home/user-profile', component: UserProfileComponent, pathMatch: 'full' },
    { path: 'notes', loadChildren: './notes/note.module#NoteModule', pathMatch: 'full' },
    { path: '*', component: HomeComponent, pathMatch: 'full' },])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
