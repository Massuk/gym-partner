import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Owner } from '../model/owner';
import { Observable, Subject, tap } from 'rxjs';

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

  get(idOwner: number): Observable<Owner> {
    return this.http.get<Owner>(`${this.url}/${idOwner}`);
  }
  update(owner: Owner) {
    return this.http
      .put(`${this.url}/update`, owner)
      .pipe(
        tap(() => {
          this.list().subscribe((data) => this.setList(data));
        })
      );
  }
}
