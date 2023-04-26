import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { exercise } from '../model/exercise';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})

export class ExerciseService {
  private url=`${base_url}/exercises`;
  private listaCambio = new Subject<exercise[]>()
  private confirmaEliminacion = new Subject<Boolean>()


  constructor(private http:HttpClient) { }
  list(){ return this.http.get<exercise[]>(this.url);}


  insert(exercise:exercise){ return this.http.post(this.url,exercise);}



  getList(){return this.listaCambio.asObservable();}


  setList(listaNueva:exercise[]){this.listaCambio.next(listaNueva);}




  listId(id:number){ return  this.http.get<exercise>(`${this.url}/${id}`);}




  update(exercise:exercise){ return this.http.put(this.url + '/'+ exercise.id,exercise);}



  // Funcion para eliminar un registro
  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }

}
