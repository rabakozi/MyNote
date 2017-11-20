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

  noteId: number;
  note: INote;
  isNew: boolean;


  constructor(private route: ActivatedRoute, private noteService: NoteService) {
    route.params.subscribe(params => {
      if (params['id'] === 'new') {
        this.isNew = true;
        this.note = this.getEmptyNote();
      } else {
        this.isNew = false;
        this.noteId = params['id'];
        this.note = this.noteService.getNote(this.noteId);
      }
    });
  }

  ngOnInit() {

  }

  onChange() {
    if (!this.isNew) {
      this.noteService.updateNote(this.note);
      this.noteUpdated();
    } else {
      this.note = this.noteService.addNote(this.note);
      this.isNew = false;
      this.noteAdded();
    }
  }

  deleteNote() {
    this.noteDeleted();
  }

  private noteDeleted() {
    this.noteService.emitChange({ id: this.note.id, action: 'delete' });
  }

  private noteAdded() {
    this.noteService.emitChange({ id: this.note.id, action: 'add' });
  }

  private noteUpdated() {
    this.noteService.emitChange({ id: this.note.id, action: 'update' });
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

