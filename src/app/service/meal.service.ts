import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Meal } from '../model/meal';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private url = `${base_url}/meals`;
  private changeList = new Subject<Meal[]>();

  constructor(private http: HttpClient) {}

  list(idNutritionalPlan: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Meal[]>(`${this.url}/${idNutritionalPlan}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(meal: Meal) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, meal, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  getList() {
    return this.changeList.asObservable();
  }

  setList(listaNueva: Meal[]) {
    this.changeList.next(listaNueva);
  }

  listId(idMeal: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Meal>(`${this.url}/details/${idMeal}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(meal: Meal) {
    let token = sessionStorage.getItem('token');
    return this.http.put(`${this.url}/update`, meal, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  hide(idMeal: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    const url = `${this.url}/hide/${idMeal}`;
    console.log(url);
    return this.http.put(url, null, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
