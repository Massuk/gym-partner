import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Owner } from '../model/owner';

const urlData = environment.base;

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private url = `${urlData}/owners`;
  constructor(private http: HttpClient) { }

  insert(owner: Owner) {
    return this.http.post(this.url, owner);
  }
}
