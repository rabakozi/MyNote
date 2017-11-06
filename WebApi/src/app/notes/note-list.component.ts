import { Component, OnInit } from '@angular/core';
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
  clickNumber: number = 0

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.notes = this.noteService.getProducts();
  }

  increaseNum(): void {
    this.clickNumber++;
  }

}
