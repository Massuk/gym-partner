import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Trainer } from '../model/trainer';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private url = `${base_url}/trainers`;
  private changeList = new Subject<Trainer[]>();
  private badgeStatus: { [key: number]: string } = {};

  constructor(private http: HttpClient) { }

  list(){
    let token = sessionStorage.getItem('token');
    return this.http.get<Trainer[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    })
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
    return this.http.get<Trainer>(`${this.url}/${idTrainer}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    })
  }

  update(trainer: Trainer) {
    let token = sessionStorage.getItem('token');
    return this.http.put(`${this.url}/update`, trainer, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  hide(idTrainer: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    const url = `${this.url}/hide/${idTrainer}`;
    return this.http.put(url, null, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  delete(idTrainer: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    const url = `${this.url}/${idTrainer}`;
    return this.http.delete(url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
