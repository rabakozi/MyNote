import { Injectable, EventEmitter } from '@angular/core';
import { INote } from "./note";
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { HttpHeaders } from "@angular/common/http";

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

  private url = 'http://localhost:9000/api/notes';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  //.set('Authorization', 'my-auth-token');

  constructor(private http: HttpClient) { }

  getNoteList(): Observable<INote[]> {
    return this.http.get<INote[]>(this.url);
  };


  getNote(id: number): Observable<INote> {
    return this.http.get<INote>(this.url + '/' + id);
  }

  updateNote(note: INote): Observable<INote> {
    let body = JSON.stringify(note);
    return this.http.put<INote>(this.url + '/' + note.id, body, { headers: this.headers });
  }

  createNote(note: INote): Observable<INote> {
    let body = JSON.stringify(note);
    return this.http.post<INote>(this.url, body, { headers: this.headers });
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
