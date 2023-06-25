import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private url = `${base_url}/users/info`;

  constructor(private http: HttpClient) { }

  getUserData(): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.get(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
