import { Injectable, EventEmitter } from '@angular/core';
import { INote } from "./note";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NoteService {

  // Intercomponental event handling :)

  // Observable string sources
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  // end of event handling part

  notes: INote[] = [
    {
      id: 1,
      userId: 1,
      title: 'First Title',
      lead: 'First lead text',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean iaculis mattis bibendum. Fusce ut ornare neque. Etiam luctus est vulputate tellus auctor placerat. Vivamus a purus urna. Nunc fermentum euismod tellus at blandit. Nam vulputate sapien nunc, ut tincidunt odio elementum a. In bibendum molestie magna in sodales.',
    },
    {
      id: 2,
      userId: 1,
      title: 'Second Title',
      lead: 'Second lead text',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vestibulum auctor cursus. Cras ultrices ligula metus, ut fermentum nisl rutrum id. In vehicula sit amet velit malesuada rhoncus. Nam porta turpis dolor. Praesent ullamcorper bibendum lacus, vel sollicitudin libero aliquet eget. Donec dignissim nisl id nunc pretium, eget posuere neque vulputate. Nulla nunc est, placerat a lacus in, eleifend elementum ligula. In ut dolor massa. Integer ut dictum lectus, ac pretium diam. Ut in ornare metus. Etiam at metus scelerisque, sollicitudin erat ac, fringilla lorem. Aenean et volutpat ante, quis vestibulum dui.',
    },
    {
      id: 3,
      userId: 1,
      title: 'Third Title',
      lead: 'Third lead text',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus est at mi eleifend pulvinar. Vestibulum eget mauris elementum mi rhoncus facilisis. Donec convallis eget purus at mollis. Nullam blandit elementum libero, eu laoreet leo aliquam eu. In et tempus augue. Ut facilisis facilisis bibendum. Sed hendrerit lorem nunc, vel porta metus pulvinar ut. Duis eu varius ante. Fusce vitae massa et erat vulputate porta et at nibh. In justo mauris, auctor a ullamcorper ac, bibendum eu nibh. Aliquam placerat consequat feugiat. Ut auctor in massa nec feugiat. Pellentesque orci velit, elementum eget arcu quis, maximus bibendum libero. Proin viverra congue ex, et eleifend lorem. Ut mi tortor, pellentesque ac erat eget, condimentum pellentesque nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
    },
    {
      id: 4,
      userId: 1,
      title: 'Fourth Title',
      lead: 'Fourth lead text',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus est at mi eleifend pulvinar. Vestibulum eget mauris elementum mi rhoncus facilisis. Donec convallis eget purus at mollis. Nullam blandit elementum libero, eu laoreet leo aliquam eu. In et tempus augue. Ut facilisis facilisis bibendum. Sed hendrerit lorem nunc, vel porta metus pulvinar ut. Duis eu varius ante. Fusce vitae massa et erat vulputate porta et at nibh. In justo mauris, auctor a ullamcorper ac, bibendum eu nibh. Aliquam placerat consequat feugiat. Ut auctor in massa nec feugiat. Pellentesque orci velit, elementum eget arcu quis, maximus bibendum libero. Proin viverra congue ex, et eleifend lorem. Ut mi tortor, pellentesque ac erat eget, condimentum pellentesque nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
    }
  ];
  
  constructor() { }

  getNoteList(): INote[] {
    return this.notes.slice(); 
  }

  getNote(id: number): INote {
    return this.notes.find(n => n.id == id);
  }

  updateNote(note: INote) {
    let i = this.notes.findIndex(n => n.id == note.id);
    this.notes[i] = Object.assign({}, note);
  }

  addNote(note: INote): INote {
    const lastNote = this.notes.reduce(function (prev, current) {
      return (prev.id > current.id) ? prev : current
    });
    note.id = lastNote.id+1;
    this.notes.push(Object.assign({}, note));
    return note;
  }

  deleteNote(id: number) {
    let i = this.notes.findIndex(n => n.id == id);
    this.notes.splice(i, 1);
  }
}