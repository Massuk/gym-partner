import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Gym } from '../model/gym';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const urlData = environment.base;

@Injectable({
  providedIn: 'root',
})
export class GymService {
  private url = `${urlData}/gyms`;
  private listaCambio = new Subject<Gym[]>();
  private gymToUpdate = new Subject<Gym>();

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
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Gym[]) {
    this.listaCambio.next(listaNueva);
  }

  // Funcion para modificar registros nuevos
  getGymToUpdate(id: number): Observable<Gym> {
    return this.http.get<Gym>(`${this.url}/${id}`);
  }

  update(id: number, gym: Gym): Observable<any> {
    return this.http.put(`${this.url}/${id}`, gym);
  }
}
