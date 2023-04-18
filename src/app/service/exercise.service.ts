import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { exercise } from '../model/exercise';
import { Subject } from 'rxjs';

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})

export class ExerciseService {
  private url=`${base_url}/exercises`;
  constructor(private http:HttpClient) { }
  list(){ return this.http.get<exercise[]>(this.url);}

  insert(exercise:exercise){ return this.http.post(this.url,exercise);}
  private listaCambio = new Subject<exercise[]>()
  setList(listaNueva:exercise[]){this.listaCambio.next(listaNueva);}
  getList(){return this.listaCambio.asObservable();}
}
