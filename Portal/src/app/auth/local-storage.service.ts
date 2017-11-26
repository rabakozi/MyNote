import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  get(key: string): object {
    var value = localStorage.getItem(key);
    return value && JSON.parse(value);
  }

  set(key: string, value: object) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
