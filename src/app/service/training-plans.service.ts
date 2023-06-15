import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TrainingPlan } from '../model/training-plan';
import { Observable, Subject } from 'rxjs';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class TrainingPlansService {

  private url = `${base_url}/trainingPlans`;
  private changeList = new Subject<TrainingPlan[]>();
  private badgeStatus: { [key: number]: string } = {};

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<TrainingPlan[]>(this.url)
  }

  insert(tPlan: TrainingPlan) {
    return this.http.post(this.url, tPlan);
  }

  getList() {
    return this.changeList.asObservable();
  }
  setList(listaNueva: TrainingPlan[]) {
    this.changeList.next(listaNueva);
  }

  listId(idTrainingPlan: number) {
    return this.http.get<TrainingPlan>(`${this.url}/${idTrainingPlan}`)
  }

  update(TrainingPlan: TrainingPlan) {
    return this.http.put(`${this.url}/update`, TrainingPlan);
  }

  hide(idTrainingPlan: number): Observable<any> {
    const url = `${this.url}/hide/${idTrainingPlan}`;
    return this.http.put(url, null);
  }

  delete(idTrainingPlan: number): Observable<any> {
    const url = `${this.url}/${idTrainingPlan}`;
    return this.http.delete(url);
  }


}
