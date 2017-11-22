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

  private url = 'localhost:9000/api/notes';
  
  constructor(private http: HttpClient) { }

  getNoteList(): Observable<INote[]> {
    return this.http.get<INote[]>(this.url);
  };


  getNote(id: number): Observable<INote> {
    return this.http.get<INote>(this.url + '/' + id);
  }

  updateNote(note: INote): Observable<INote> {
    let body = JSON.stringify(note);
    return this.http.put(this.url, body);
  }

  createNote(note: INote): Observable<INote> {
    let body = JSON.stringify(note);
    return this.http.post<INote>(this.url + '/' + note.id, body);
  }

  deleteNote(id: number) {
    return this.http.delete<INote>(this.url + '/' + id);
  }
}
