import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Owner } from '../model/owner';
import { Subject } from 'rxjs';

const urlData = environment.base;

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private url = `${urlData}/owners`;
  private changeList = new Subject<Owner[]>();

  constructor(private http: HttpClient) {}

  insert(owner: Owner) {
    return this.http.post(this.url, owner);
  }

  getList() {
    return this.changeList.asObservable();
  }

  setList(newList: Owner[]) {
    this.changeList.next(newList);
  }

  list() {
    return this.http.get<Owner[]>(this.url);
  }
}
