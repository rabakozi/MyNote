import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { INote } from "./note";
import { NoteService } from "./note.service"


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
  providers: [NoteService]
})
export class NoteListComponent implements OnInit {

  notes: INote[] = [];

  constructor(private noteService: NoteService, private router: Router) {
    noteService.changeEmitted$.subscribe(
      evt => {
        switch (evt.action)
        {
          case 'delete':
            this.noteService.deleteNote(evt.id);

            this.noteService.getNoteList().subscribe(
              notes => this.notes = notes,
              error => console.log(error));

            break;
          case 'add':
            this.notes = this.noteService.getNoteList();
            break;
          case 'update':
            this.notes = this.noteService.getNoteList();
            break;
        }
      });
  }

  ngOnInit() {
    this.noteService.getNoteList().subscribe(
      notes => this.notes = notes,
      error => console.log(error));
  }


  createNew() {
    this.router.navigate(['/notes/new']);
  }

}
