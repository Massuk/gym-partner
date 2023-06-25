import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../model/client';
import { Observable, Subject } from 'rxjs';

const urlData = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = `${urlData}/clients`;
  private changeList = new Subject<Client[]>();

  constructor(private http: HttpClient) {}

  list(username: String) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Client[]>(`${this.url}/${username}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  getList() {
    return this.changeList.asObservable();
  }
  setList(newList: Client[]) {
    this.changeList.next(newList);
  }
}
