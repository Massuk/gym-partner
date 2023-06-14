import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable,Subject } from 'rxjs';
import { food } from '../model/food';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})

export class FoodService {
  private url=`${base_url}/foods`;
  private changeList = new Subject<food[]>();
  private confirmaEliminacion = new Subject<Boolean>()


  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<food[]>(this.url);
  }
  insert(food: food) {
    return this.http.post(this.url, food);
  }

  getList() {
    return this.changeList.asObservable();
  }
  setList(listaNueva: food[]) {
    this.changeList.next(listaNueva);
  }


  listId(id: number) {
    return this.http.get<food>(`${this.url}/${id}`);
  }


  update(p: food) {
    return this.http.put(this.url + '/' + p.id, p);
  }

  // Funcion para eliminar un registro
  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }
}
