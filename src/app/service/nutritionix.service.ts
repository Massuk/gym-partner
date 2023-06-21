import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NutritionixService {
  private apiEndpoint = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
  private apiId = 'b4aa466f';
  private apiKey = 'e71c5ed5c8c492ad8544e60f0565eaf8	';
  private apiUrl = 'https://trackapi.nutritionix.com/v2/';

  constructor(private http: HttpClient) { }

  getFoods(query: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-app-id': this.apiId,
      'x-app-key': this.apiKey
    });

    const body = { query: query };

    return this.http.post<any>(this.apiEndpoint, body, { headers: headers });
  }
}
