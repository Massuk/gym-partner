import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Exercise } from '../model/exercise';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private url = `${base_url}/exercises`;
  private changeList = new Subject<Exercise[]>();

  constructor(private http: HttpClient) {}
  list(idRoutine: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Exercise[]>(`${this.url}/${idRoutine}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(exercise: Exercise) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, exercise, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  getList() {
    return this.changeList.asObservable();
  }
  setList(listaNueva: Exercise[]) {
    this.changeList.next(listaNueva);
  }
  listId(idExercise: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Exercise>(`${this.url}/details/${idExercise}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(exercise: Exercise) {
    let token = sessionStorage.getItem('token');
    return this.http.put(`${this.url}/update`, exercise, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  delete(id: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    const url = `${this.url}/delete/${id}`;
    return this.http.delete(url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
