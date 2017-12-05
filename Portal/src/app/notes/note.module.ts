import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'

import { NoteDetailComponent } from './note-detail.component';
import { NoteComponent } from './note.component';
import { NoteListItemComponent } from './note-list-item.component';
import { ClipboardModule } from 'ngx-clipboard';
import { SharedNoteComponent } from './shared-note.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClipboardModule,
    RouterModule.forChild([
      { pathMatch: 'full', path: 'notes', component: NoteComponent },
      { pathMatch: 'full', path: 'notes/:id', component: NoteComponent },
      { pathMatch: 'full', path: 'viewnote/:id', component: SharedNoteComponent }
    ])
  ],
  declarations: [NoteDetailComponent, NoteComponent, NoteListItemComponent, SharedNoteComponent],
  exports: [NoteComponent]
})
export class NoteModule { }
