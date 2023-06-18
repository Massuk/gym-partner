import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Routine } from '../model/routine';
import { Observable, Subject } from 'rxjs';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  private url = `${base_url}/routines`;
  private changeList = new Subject<Routine[]>();

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Routine[]>(this.url)
  }

  insert(routine: Routine) {
    return this.http.post(this.url,routine);
  }

  getList() {
    return this.changeList.asObservable();
  }
  setList(listaNueva: Routine[]) {
    this.changeList.next(listaNueva);
  }

  listId(idRoutine: number) {
    return this.http.get<Routine>(`${this.url}/${idRoutine}`);
  }

  update(Routine: Routine) {
    return this.http.put(`${this.url}/update`, Routine);
  }

  hide(idRoutine: number): Observable<any> {
    const url = `${this.url}/hide/${idRoutine}`;
    return this.http.put(url, null);
  }

  delete(idRoutine: number): Observable<any> {
    const url = `${this.url}/${idRoutine}`;
    return this.http.delete(url);
  }


}
