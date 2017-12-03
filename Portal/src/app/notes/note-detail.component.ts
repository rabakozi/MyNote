import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
      if (!params['id']) {
        return;
      }
      console.log(params['id']);
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

  onTitleChange(title: HTMLTextAreaElement) {
    this.note.title = title.value;
    if (!this.isNew) {
      this.updateNote();
    } else {
      this.createNote();
    }
  }

  onContentChange(content: HTMLTextAreaElement) {
    this.note.content = content.value;
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
        this.noteService.emitChange({ action: 'create', subject: response });
      });
  }

  updateNote() {
    this.noteService.updateNote(this.note)
      .subscribe(response => {
        this.noteService.emitChange({ action: 'update', subject: response });
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

