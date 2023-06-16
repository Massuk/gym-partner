import { HttpClient } from '@angular/common/http';
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
  private confirmaEliminacion = new Subject<Boolean>()


  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Food[]>(this.url);
  }
  insert(food: Food) {
    return this.http.post(this.url, food);
  }

  getList() {
    return this.changeList.asObservable();
  }
  setList(listaNueva: Food[]) {
    this.changeList.next(listaNueva);
  }


  listId(id: number) {
    return this.http.get<Food>(`${this.url}/${id}`);
  }


  update(food: Food) {
    return this.http.put(`${this.url}/update`, food);
  }

  // Funcion para eliminar un registro
  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }
}
