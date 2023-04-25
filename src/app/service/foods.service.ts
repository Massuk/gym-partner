import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { food } from '../model/food';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private url=`${base_url}/foods`;
  private listaCambio = new Subject<food[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<food[]>(this.url);
  }
  insert(food: food) {
    return this.http.post(this.url, food);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: food[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    return this.http.get<food>(`${this.url}/${id}`);
  }
  update(p: food) {
    return this.http.put(this.url + '/' + p.id, p);
  }
}
