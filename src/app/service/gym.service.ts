import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Gym[]>(this.url);
  }

  // Funcion para agregar registros nuevos
  insert(gym: Gym) {
    return this.http.post(this.url, gym);
  }

  getList() {
    return this.changeList.asObservable();
  }

  setList(listaNueva: Gym[]) {
    this.changeList.next(listaNueva);
  }

  // Funcion para modificar registros nuevos

  get(idGym: number): Observable<Gym> {
    return this.http.get<Gym>(`${this.url}/${idGym}`);
  }
  update(gym: Gym) {
    return this.http.put(`${this.url}/update`, gym).pipe(
      tap(() => {
        this.list().subscribe((data) => this.setList(data));
      })
    );
  }

  hide(idGym: number): Observable<any> {
    const url = `${this.url}/hide/${idGym}`;
    return this.http.put(url, null);
  }

  // Funcion para eliminar un registro
  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }
}
