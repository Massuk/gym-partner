import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NutritionalPlan } from '../model/nutritionalPlan';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class NutritionalPlanService {
  private url = `${base_url}/nutritionalPlans`;
  private listaCambio = new Subject<NutritionalPlan[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<NutritionalPlan[]>(this.url);
  }
  insert(nutritionalPlan: NutritionalPlan) {
    return this.http.post(this.url, nutritionalPlan);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: NutritionalPlan[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    return this.http.get<NutritionalPlan>(`${this.url}/${id}`);
  }

  update(nutritionalPlan: NutritionalPlan) {
    return this.http.put(this.url + '/' + nutritionalPlan.id, nutritionalPlan);
  }
}
