import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Owner } from '../model/owner';
import { Observable, Subject, tap } from 'rxjs';
import { GymByOwner } from '../model/report';

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
  gymByOwner(): Observable<GymByOwner[]> {
    let token = sessionStorage.getItem('token');
    const url = `${this.url}/gymByOwners`;
    return this.http.get<GymByOwner[]>(url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

}
