import { Component, OnInit, Input } from '@angular/core';
import { INote } from "./note";
import { NoteService } from "./note.service";

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.css']
})
export class NoteListItemComponent implements OnInit {

  @Input() note: INote;

  constructor(private noteService: NoteService) {}

  ngOnInit() {
  }

  public deleteNote()
  {
    //this.noteService.deleteNote(this.note.id);
    this.noteService.emitChange({ id: this.note.id, action: "delete" });
  }

}
