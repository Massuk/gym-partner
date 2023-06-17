import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Trainer } from '../model/trainer';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
    return this.http.get<Trainer[]>(this.url)
  }

  insert(trainer: Trainer) {
    return this.http.post(this.url, trainer);
  }

  getList() {
    return this.changeList.asObservable();
  }
  setList(listaNueva: Trainer[]) {
    this.changeList.next(listaNueva);
  }

  listId(idTrainer: number) {
    return this.http.get<Trainer>(`${this.url}/${idTrainer}`)
  }

  update(trainer: Trainer) {
    return this.http.put(`${this.url}/update`, trainer);
  }

  hide(idTrainer: number): Observable<any> {
    const url = `${this.url}/hide/${idTrainer}`;
    return this.http.put(url, null);
  }

  delete(idTrainer: number): Observable<any> {
    const url = `${this.url}/${idTrainer}`;
    return this.http.delete(url);
  }
}
