import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../model/client';

const urlData = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = `${urlData}/clients`;

  constructor(private http: HttpClient) {}

    // Funcion de listar los clientes

}
