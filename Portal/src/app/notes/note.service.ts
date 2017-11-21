import { Injectable, EventEmitter } from '@angular/core';
import { INote } from "./note";
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

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

  private baseUrl = 'localhost:9000/';
  
  constructor(private http: HttpClient) { }

  getNoteList(): Observable<INote[]> {
    return this.http.get<INote[]>(this.baseUrl + 'api/notes')
      .do(data => console.log(JSON.stringify(data)))
      .catch((error: Response) => { return Observable.throw(null)});
  }

  getNote(id: number): Observable<INote> {
    let url = this.baseUrl + 'api/notes/' + id;
    return this.http.get<INote>(url)
      .do(data => console.log(JSON.stringify(data)));
    //   .catch(s => console.log('Error!: '));
  }

  updateNote(note: INote): Observable<INote> {
    let url = this.baseUrl + 'api/notes/' + note.id;
    let body = JSON.stringify(note);
    return this.http
      .put(url, body, this.options)
      .map(this.extractData)
      .catch(this.handleError);


    //let i = this.notes.findIndex(n => n.id == note.id);
    //this.notes[i] = Object.assign({}, note);
  }

  createNote(note: INote): INote {
    const lastNote = this.notes.reduce((prev, current) => (prev.id > current.id) ? prev : current);
    note.id = lastNote.id+1;
    this.notes.push(Object.assign({}, note));
    return note;
  }

  deleteNote(id: number) {
    let i = this.notes.findIndex(n => n.id == id);
    this.notes.splice(i, 1);
  }
}
