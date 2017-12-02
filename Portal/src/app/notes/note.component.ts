import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { INote } from "./note";
import { NoteService } from "./note.service"


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  notes: INote[] = [];
  noteId = '';

  constructor(
    private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    noteService.changeEmitted$.subscribe(
      evt => {
        let note = evt.subject as INote;
        let index = this.notes.findIndex(n => n.id == note.id);
        switch (evt.action)
        {
          case 'delete':
            console.log('delete');
            this.notes.splice(index, 1);
            break;
          case 'create':
            console.log('create');
            this.notes.splice(0, 0, note);
            break;
          case 'update':
            console.log('update');
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
