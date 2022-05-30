import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Results } from 'src/app/models/results';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private API_URI = 'https://api.spoonacular.com/recipes'
  private API_KEY = 'bb5835c396eb41f6bca2c97f9d5990b7'

  constructor(private http: HttpClient) { }

  public search(query: string): Observable<Results> {
    let params = new HttpParams;
    params = params.append('query', query);
    params = params.append('number', 5);
    params = params.append('apiKey', this.API_KEY);
    return this.http.get(`${this.API_URI}/complexSearch?`,{params: params})
  }

  public getDish(id: Number): Observable<Object> {
    let params = new HttpParams;
    params = params.append('apiKey', this.API_KEY);
    return this.http.get(`${this.API_URI}/${id}/information`,{params: params})
  }
}
