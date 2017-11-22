import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { INote } from "./note";
import { NoteService } from "./note.service"

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {

  note: INote;
  isNew: boolean;

  constructor(private route: ActivatedRoute, private noteService: NoteService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id === 'new') {
        this.isNew = true;
        this.note = this.getEmptyNote();
      } else {
        this.isNew = false;
        this.getNote(id);
      }
    });
  }

  onChange() {
    if (!this.isNew) {
      this.updateNote();
    } else {
      this.createNote();
    }
  }

  getNote(id) {
    this.noteService.getNote(id)
      .subscribe(response => this.note = response,
      (error: Response) => {
        if (error.status === 404) {
          alert('no post with this id');
        } else {
          alert('error happened');
          console.log(error);
        }
      });
  }

  createNote() {
    this.noteService.createNote(this.note)
      .subscribe(response => {
        this.isNew = false;
        this.noteService.emitChange({ action: 'create', subject: this.note });
      });
  }

  updateNote() {
    this.noteService.updateNote(this.note)
      .subscribe(response => {
        this.noteService.emitChange({ action: 'update', subject: this.note });
      });
  }

  deleteNote() {
    this.noteService.deleteNote(this.note.id)
      .subscribe(response => {
        this.noteService.emitChange({ action: 'delete', subject: this.note });
      });
  }

  private getEmptyNote(): INote {
    return {
      id: 0,
      userId: 1,
      title: '',
      lead: '',
      content: ''
    }
  }

}

