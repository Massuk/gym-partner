import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NutritionalPlan } from '../model/nutritional-plan';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CaloriesByNutritionalPlan } from '../model/report';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class NutritionalPlanService {
  private url = `${base_url}/nutritionalPlans`;
  private changeList = new Subject<NutritionalPlan[]>();

  constructor(private http: HttpClient) {}

  list(idUser: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<NutritionalPlan[]>(`${this.url}/${idUser}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(nutritionalPlan: NutritionalPlan) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, nutritionalPlan, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  getList() {
    return this.changeList.asObservable();
  }
  setList(newList: NutritionalPlan[]) {
    this.changeList.next(newList);
  }
  listId(idNutritionalPlan: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<NutritionalPlan>(
      `${this.url}/details/${idNutritionalPlan}`,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }
  update(nutritionalPlan: NutritionalPlan) {
    let token = sessionStorage.getItem('token');
    return this.http.put(`${this.url}/update`, nutritionalPlan, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  hide(idNutritionalPlan: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    const url = `${this.url}/hide/${idNutritionalPlan}`;
    return this.http.put(url, null, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  getCaloriesCount(): Observable<CaloriesByNutritionalPlan[]> {
    let token = sessionStorage.getItem('token');
    const url = `${this.url}/caloriesCount`;
    return this.http.get<CaloriesByNutritionalPlan[]>(url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

}
