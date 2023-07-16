import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Trainer } from '../model/trainer';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userItems } from '../component/dashboard/header/header-dummy-data';
import { ClientsByTrainer } from '../model/report';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private url = `${base_url}/trainers`;
  private changeList = new Subject<Trainer[]>();
  private badgeStatus: { [key: number]: string } = {};

  constructor(private http: HttpClient) { }

  list(username: String) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Trainer[]>(`${this.url}/list/${username}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(trainer: Trainer) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, trainer, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  getList() {
    return this.changeList.asObservable();
  }
  setList(listaNueva: Trainer[]) {
    this.changeList.next(listaNueva);
  }

  listId(idTrainer: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Trainer>(
      `${this.url}/details/${idTrainer}`,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }

  update(trainer: Trainer) {
    let token = sessionStorage.getItem('token');
    return this.http.put(`${this.url}`, trainer, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  clientsByTrainer(): Observable<ClientsByTrainer[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<ClientsByTrainer[]>(`${this.url}/trainersClientsCount`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
