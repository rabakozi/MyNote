import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NoteDetailComponent } from './note-detail.component';
import { NoteListComponent } from './note-list.component';
import { NoteListItemComponent } from './note-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'notes', component: NoteListComponent },
      {
        path: 'notes/:id', component: NoteDetailComponent
      }
    ])
  ],
  declarations: [NoteDetailComponent, NoteListComponent, NoteListItemComponent],
  exports: [NoteListComponent]
})
export class NoteModule { }
