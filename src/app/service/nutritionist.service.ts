import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Nutritionist } from '../model/nutritionist';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ClientsByNutritionist } from '../model/report';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class NutritionistService {
  private url = `${base_url}/nutritionists`;
  private changeList = new Subject<Nutritionist[]>();

  constructor(private http: HttpClient) {}

  list(username: String) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Nutritionist[]>(`${this.url}/list/${username}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(nutritionist: Nutritionist) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, nutritionist, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  getList() {
    return this.changeList.asObservable();
  }
  setList(newList: Nutritionist[]) {
    this.changeList.next(newList);
  }
  listId(idNutritionist: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Nutritionist>(
      `${this.url}/details/${idNutritionist}`,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }
  update(nutritionist: Nutritionist) {
    let token = sessionStorage.getItem('token');
    return this.http.put(`${this.url}`, nutritionist, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  clientsByNutritionist(): Observable<ClientsByNutritionist[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<ClientsByNutritionist[]>(`${this.url}/nutritionistClientsCount`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
