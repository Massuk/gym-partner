import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NutritionalPlan } from '../model/nutritional-plan';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class NutritionalPlanService {
  private url = `${base_url}/nutritionalPlans`;
  private changeList = new Subject<NutritionalPlan[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<NutritionalPlan[]>(this.url);
  }
  insert(nutritionalPlan: NutritionalPlan) {
    return this.http.post(this.url, nutritionalPlan);
  }
  getList() {
    return this.changeList.asObservable();
  }
  setList(newList: NutritionalPlan[]) {
    this.changeList.next(newList);
  }
  listId(idNutritionalPlan: number) {
    return this.http.get<NutritionalPlan>(`${this.url}/${idNutritionalPlan}`);
  }
  update(nutritionalPlan: NutritionalPlan) {
    return this.http.put(`${this.url}/update`, nutritionalPlan);
  }

  hide(idNutritionalPlan: number): Observable<any> {
    const url = `${this.url}/hide/${idNutritionalPlan}`;
    return this.http.put(url, null);
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }
}
