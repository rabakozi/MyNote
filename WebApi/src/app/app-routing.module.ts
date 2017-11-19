import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'notes', loadChildren: 'notes/note.module#NoteModule' }])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
