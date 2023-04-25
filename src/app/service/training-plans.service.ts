import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TrainingPlan } from '../model/training-plans';
import { Observable, Subject } from 'rxjs';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class TrainingPlansService {

  private url = `${base_url}/trainingPlans`;
  private listaCambio = new Subject<TrainingPlan[]>();

  constructor(private http: HttpClient) { }
  
  list(){
    return this.http.get<TrainingPlan[]>(this.url)
  }
  
  insert(tPlan: TrainingPlan) {
    return this.http.post(this.url, tPlan);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: TrainingPlan[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) {
    return this.http.get<TrainingPlan>(`${this.url}/${id}`)
  }

  update(tPlan: TrainingPlan) {
    return this.http.put(this.url + "/" + tPlan.id, tPlan);
  }

  ////

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }

  
}
