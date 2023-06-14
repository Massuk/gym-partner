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
  private listaCambio = new Subject<Gym[]>();

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

  get(id: number): Observable<Gym> {
    return this.http.get<Gym>(`${this.url}/${id}`);
  }
  update(gym: Gym) {
    return this.http.put(`${this.url}/${gym.idGym}`, gym).pipe(
      tap(() => {
        this.list().subscribe((data) => this.setList(data));
      })
    );
  }

  // Funcion para eliminar un registro
  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }
}
