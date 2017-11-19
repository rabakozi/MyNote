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

  get noteTitle(): string {
    return this.note ? this.note.title : '';
  }
  set noteTitle(value: string) {
    //if (this.note) {
    //  this.note.title = value;
    //  this.noteService.updateNote(this.note);
    //} else {
    //  let newNote = this.getEmptyNote();
    //  newNote.title = value;
    //  this.note = this.noteService.addNote(newNote);
    //  this.noteAdded();
    //}
  }

  get noteContent(): string {
    return this.note ? this.note.content : '';
  }
  set noteContent(value: string) {
    //if (this.note) {
    //  this.note.content = value;
    //  this.noteService.updateNote(this.note);
    //} else {
    //  let newNote = this.getEmptyNote();
    //  newNote.content = value;
    //  this.note = this.noteService.addNote(newNote);
    //  this.noteAdded();
    //}
  }

  constructor(private route: ActivatedRoute, private noteService: NoteService) {
    route.params.subscribe(params => {
      if (params['id'] !== 'new') {
        this.noteId = params['id'];
        this.note = this.noteService.getNote(this.noteId);
      }
    });
  }

  ngOnInit() {

  }

  public onTitleChange() {
    if (this.note) {
      this.note.title = this.noteTitle;
      this.noteService.updateNote(this.note);
    } else {
      let newNote = this.getEmptyNote();
      newNote.title = this.noteTitle;
      this.note = this.noteService.addNote(newNote);
      this.noteAdded();
    }
  }

  public onContentChange() {
    if (this.note) {
      this.note.content = this.noteContent;
      this.noteService.updateNote(this.note);
    } else {
      let newNote = this.getEmptyNote();
      newNote.content = this.noteContent;
      this.note = this.noteService.addNote(newNote);
      this.noteAdded();
    }
  }

  public deleteNote() {
    this.noteService.emitChange({ id: this.note.id, action: "delete" });
  }

  private noteAdded() {
    this.noteService.emitChange({ id: this.note.id, action: "add" });
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

