import { Injectable, EventEmitter } from '@angular/core';
import { INote } from "./note";
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

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

  private apiEndpoint = environment.serviceBaseUrl + '/api/notes' ;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  //.set('Authorization', 'my-auth-token');

  constructor(private http: HttpClient) { }

  getNoteList(): Observable<INote[]> {
    return this.http.get<INote[]>(this.apiEndpoint);
  };


  getNote(id: number): Observable<INote> {
    return this.http.get<INote>(this.apiEndpoint + '/' + id);
  }

  updateNote(note: INote): Observable<INote> {
    let body = JSON.stringify(note);
    return this.http.put<INote>(this.apiEndpoint + '/' + note.id, body, { headers: this.headers });
  }

  createNote(note: INote): Observable<INote> {
    let body = JSON.stringify(note);
    return this.http.post<INote>(this.apiEndpoint, body, { headers: this.headers });
  }

  deleteNote(noteId: number): Observable<any> {
    return this.http.delete(this.apiEndpoint + '/' + noteId);
  }

  getByAccessLink(link: string): Observable<INote> {
    return this.http.get<INote>(this.apiEndpoint + '/' + link);
  }

  createAccessLink(noteId: number): Observable<INote> {
    return this.http.post<INote>(this.apiEndpoint + '/' + noteId + '/share', null, { headers: this.headers });
  }

  deleteAccessLink(noteId: number): Observable<any> {
    return this.http.delete(this.apiEndpoint + '/' + noteId + '/share');
  }
}
