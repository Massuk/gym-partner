import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Routine } from '../model/routine';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  private url = `${base_url}/routines`;
  private changeList = new Subject<Routine[]>();

  constructor(private http: HttpClient) {}

  list(idTrainingPlan: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Routine[]>(`${this.url}/${idTrainingPlan}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(routine: Routine) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, routine, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  getList() {
    return this.changeList.asObservable();
  }
  setList(listaNueva: Routine[]) {
    this.changeList.next(listaNueva);
  }
  listId(idRoutine: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Routine>(`${this.url}/details/${idRoutine}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(Routine: Routine) {
    let token = sessionStorage.getItem('token');
    return this.http.put(`${this.url}/update`, Routine, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  hide(idRoutine: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    const url = `${this.url}/hide/${idRoutine}`;
    return this.http.put(url, null, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
