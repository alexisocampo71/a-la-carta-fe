import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StateService } from './state.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  API_URI = 'http://challenge-react.alkemy.org/'

  constructor(private http : HttpClient, private state: StateService, private router: Router) { }

  public isAuthenticated() : Boolean {
    let userData = localStorage.getItem('userInfo')
    if (userData && JSON.parse(userData)) {
      return true;
    }
    return false;
  }

  public setUserInfo(user: Object): void {
    this.state.setUser(JSON.stringify(user))
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public logIn(body: Object): Observable<Object> {
    return this.http.post(`${this.API_URI}`, body, {
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  public logOut(): void {
    localStorage.removeItem('userInfo');
    this.state.setUser('')
    this.router.navigate(['/login'])
  }
}
