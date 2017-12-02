import { Component, OnInit } from '@angular/core';
import { NoteService } from "./note.service";
import { INote } from "./note";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-shared-note',
  templateUrl: './shared-note.component.html',
  styleUrls: ['./shared-note.component.css']
})
export class SharedNoteComponent implements OnInit {

  note: INote;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!params['id']) {
        return;
      }
      let link = params['id'];
      this.getNote(link);
    });
  }

  getNote(link) {
    this.noteService.getByAccessLink(link)
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

}
