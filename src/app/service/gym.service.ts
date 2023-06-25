import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Gym } from '../model/gym';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const urlData = environment.base;

@Injectable({
  providedIn: 'root',
})
export class GymService {
  private url = `${urlData}/gyms`;
  private changeList = new Subject<Gym[]>();

  constructor(private http: HttpClient) {}

  // Funcion de listar los gimnasios
  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Gym[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  // Funcion para agregar registros nuevos
  insert(gym: Gym) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, gym, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  getList() {
    return this.changeList.asObservable();
  }

  setList(listaNueva: Gym[]) {
    this.changeList.next(listaNueva);
  }

  // Funcion para modificar registros nuevos

  get(idGym: number): Observable<Gym> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Gym>(`${this.url}/${idGym}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(gym: Gym) {
    let token = sessionStorage.getItem('token');
    return this.http.put(`${this.url}/update`, gym, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }).pipe(
      tap(() => {
        this.list().subscribe((data) => this.setList(data));
      })
    );
  }

  hide(idGym: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    const url = `${this.url}/hide/${idGym}`;
    return this.http.put(url, null, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  // Funcion para eliminar un registro
  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }

  //Función para obtener un gimnasio de acuerdo al username (email) de un owner
  listGymByUsername(username: String) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Gym>(`${this.url}/list/${username}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
