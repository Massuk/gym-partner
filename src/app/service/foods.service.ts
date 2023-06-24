import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable,Subject } from 'rxjs';
import { Food } from '../model/food';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})

export class FoodService {
  private url=`${base_url}/foods`;
  private changeList = new Subject<Food[]>();

  constructor(private http:HttpClient) { }
  list(){
    let token = sessionStorage.getItem('token');
    return this.http.get<Food[]>(this.url, {
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


  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Food>(`${this.url}/${id}`, {
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

  // Funcion para eliminar un registro
  delete(id: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    const url = `${this.url}/${id}`;
    return this.http.delete(url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
