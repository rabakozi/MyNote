import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'

import { NoteDetailComponent } from './note-detail.component';
import { NoteComponent } from './note.component';
import { NoteListItemComponent } from './note-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'notes', component: NoteComponent },
      { path: 'notes/:id', component: NoteComponent }
    ])
  ],
  declarations: [NoteDetailComponent, NoteComponent, NoteListItemComponent],
  exports: [NoteComponent]
})
export class NoteModule { }
