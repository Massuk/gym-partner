import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Nutritionist } from '../model/nutritionist';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class NutritionistService {
  private url = `${base_url}/nutritionists`;
  private changeList = new Subject<Nutritionist[]>();
  private badgeStatus: { [key: number]: string } = {};

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Nutritionist[]>(this.url);
  }
  insert(nutritionist: Nutritionist) {
    return this.http.post(this.url, nutritionist);
  }
  getList() {
    return this.changeList.asObservable();
  }
  setList(newList: Nutritionist[]) {
    this.changeList.next(newList);
  }
  listId(idNutritionist: number) {
    return this.http.get<Nutritionist>(`${this.url}/${idNutritionist}`);
  }
  update(nutritionist: Nutritionist) {
    return this.http.put(`${this.url}`, nutritionist);
  }
  hide(idNutritionist: number): Observable<any> {
    const url = `${this.url}/hide/${idNutritionist}`;
    return this.http.put(url, null);
  }
}
