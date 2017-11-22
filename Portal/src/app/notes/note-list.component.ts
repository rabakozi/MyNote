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
        let note = evt.subject as INote;
        let index = this.notes.findIndex(n => n.id == note.id);
        switch (evt.action)
        {
          case 'delete':
            this.notes.splice(index, 1);
            break;
          case 'create':
            this.notes.splice(0, 0, note);
            break;
          case 'update':
            this.notes[index] = note;
            break;
        }
      });
  }

  ngOnInit() {
    this.noteService.getNoteList().subscribe(
      notes => {
        this.notes = notes
      },
      error => console.log(error));
  }


  createNew() {
    this.router.navigate(['/notes/new']);
  }

}
