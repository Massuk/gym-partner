import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Meal } from '../model/meal';
import { Observable, Subject } from 'rxjs';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private url = `${base_url}/meals`;
  private changeList = new Subject<Meal[]>();


  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Meal[]>(this.url)
  }

  insert(meal: Meal) {
    return this.http.post(this.url,meal);
  }

  getList() {
    return this.changeList.asObservable();
  }
  setList(listaNueva: Meal[]) {
    this.changeList.next(listaNueva);
  }

  listId(idMeal: number) {
    return this.http.get<Meal>(`${this.url}/${idMeal}`);
  }

  update(Meal: Meal) {
    return this.http.put(`${this.url}/update`, Meal);
  }

  hide(idMeal: number): Observable<any> {
    const url = `${this.url}/hide/${idMeal}`;
    return this.http.put(url, null);
  }

  delete(idMeal: number): Observable<any> {
    const url = `${this.url}/${idMeal}`;
    return this.http.delete(url);
  }

}
