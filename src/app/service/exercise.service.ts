import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Exercise } from '../model/exercise';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private url = `${base_url}/Exercises`;
  private changeList = new Subject<Exercise[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Exercise[]>(this.url);
  }

  insert(exercise: Exercise) {
    return this.http.post(this.url, exercise);
  }

  getList() {
    return this.changeList.asObservable();
  }

  setList(listaNueva: Exercise[]) {
    this.changeList.next(listaNueva);
  }

  listId(idExercise: number) {
    return this.http.get<Exercise>(`${this.url}/${idExercise}`);
  }

  update(exercise: Exercise) {
    return this.http.put(`${this.url}/update`, exercise);
  }

  hide(idExercise: number): Observable<any> {
    const url = `${this.url}/hide/${idExercise}`;
    return this.http.put(url, null);
  }

  // Funcion para eliminar un registro
  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }
}
