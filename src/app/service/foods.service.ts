import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable,Subject } from 'rxjs';
import { Food } from '../model/food';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})

export class FoodService {
  private url = `${base_url}/foods`;
  private changeList = new Subject<Food[]>();

  constructor(private http: HttpClient) {}
  list(idMeal: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Food[]>(`${this.url}/${idMeal}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(food: Food) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, food, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  getList() {
    return this.changeList.asObservable();
  }
  setList(listaNueva: Food[]) {
    this.changeList.next(listaNueva);
  }
  listId(idFood: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Food>(`${this.url}/details/${idFood}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(food: Food) {
    let token = sessionStorage.getItem('token');
    return this.http.put(`${this.url}/update`, food, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  delete(id: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    const url = `${this.url}/delete/${id}`;
    return this.http.delete(url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
