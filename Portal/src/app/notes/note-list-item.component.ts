import { Component, OnInit, Input } from '@angular/core';
import { INote } from "./note";
import { NoteService } from "./note.service";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.css']
})
export class NoteListItemComponent implements OnInit {

  @Input() note: INote;
  shareUrl: string;
  isSelected: boolean;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!params['id'] || params['id'] === 'new') {
        return;
      }
      let id = params['id'];
      this.isSelected = this.note.id == id;
    });
  }

  shareNote() {
    if (!this.note.shareLink) {
      this.noteService.createAccessLink(this.note.id)
        .subscribe((response: INote) => {
          this.note.shareLink = response.shareLink;
          this.showCopyIcon();
        });
    } else {
      this.noteService.deleteAccessLink(this.note.id)
        .subscribe(() => {
          this.note.shareLink = null;
          this.hideCopyIcon();
        });
    }
  }

  deleteNote()
  {
    this.noteService.deleteNote(this.note.id)
      .subscribe(() => {
//debugger;
      });
    this.noteService.emitChange({ action: "delete", subject: this.note });
  }


  showCopyIcon() {
    if (this.note.shareLink) {
      this.shareUrl = "http://localhost:4200/viewnote/" + this.note.shareLink;
    }
  }

  hideCopyIcon() {
    this.shareUrl = null;
  }

}
