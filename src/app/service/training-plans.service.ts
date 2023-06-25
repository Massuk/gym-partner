import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TrainingPlan } from '../model/training-plan';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class TrainingPlansService {
  private url = `${base_url}/trainingPlans`;
  private changeList = new Subject<TrainingPlan[]>();

  constructor(private http: HttpClient) {}

  list(idUser: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<TrainingPlan[]>(`${this.url}/${idUser}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(tPlan: TrainingPlan) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, tPlan, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  getList() {
    return this.changeList.asObservable();
  }
  setList(listaNueva: TrainingPlan[]) {
    this.changeList.next(listaNueva);
  }
  listId(idTrainingPlan: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<TrainingPlan>(
      `${this.url}/details/${idTrainingPlan}`,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }
  update(TrainingPlan: TrainingPlan) {
    let token = sessionStorage.getItem('token');
    return this.http.put(`${this.url}/update`, TrainingPlan, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  hide(idTrainingPlan: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    const url = `${this.url}/hide/${idTrainingPlan}`;
    return this.http.put(url, null, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
